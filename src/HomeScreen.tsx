import React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, Text, SafeAreaView, View,Linking, TouchableOpacity } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Country, getCountries } from './client';
import { windowHeight, windowWidth } from './constants';
import { getScreenStyle } from './misc/getScreenStyle';

export const HomeScreen: NavigationFunctionComponent<Props> = (props) => {

  Linking.getInitialURL().then(res=>console.log(res))

  const [countries, setCountries] = useState<Array<Country>>([])
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(20)
  useEffect(() => {
    fetch()
  }, [page])

  const fetch = () => {
    getCountries(page, size).then((res: Array<Country>) => {
      setCountries(res)
    })
  }

  const ListHeaderComponent = () => {
    return (<React.Fragment><View style={{
      borderBottomLeftRadius: 50,
      width: windowWidth, height: windowHeight / 3,
      backgroundColor: '#febfcb'
    }}></View>
      <Text style={{ margin: 12, fontWeight: 'bold', fontSize: 20 }}>List of countries</Text>
    </React.Fragment>)
  }

  const sendToDetail = (country: Country) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'DetailScreen',
        passProps: {
          name: country.name,
          code: country.code,
          capital: country.capital,
          emoji: country.emoji,
          phone: country.phone,
          continentName: country?.continent?.name,
          continentCode: country?.continent?.code
        }
      }
    });
  }

  const renderItem = ({ item, index }: { item: Country, index: number }) => {
    return <TouchableOpacity style={{
      margin: 10,
      backgroundColor: '#ffffff',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
      paddingLeft: 5,
      flexDirection: 'row'
    }}
      onPress={sendToDetail.bind(null, item)}
    >
      <Text style={{
        fontSize: 90, height: 80, lineHeight: 65,
        paddingTop: 90 - (90 * 0.7),
      }}>{item.emoji}</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 20, color: '#868686' }}>{item.capital}</Text>
      </View>
    </TouchableOpacity>
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root>

        <FlatList
          data={countries}
          keyExtractor={(item: Country) => item.code}
          {...{ renderItem, ListHeaderComponent }}
        />
      </Root>
    </SafeAreaView>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`;


HomeScreen.options = getScreenStyle();
//#endregion
