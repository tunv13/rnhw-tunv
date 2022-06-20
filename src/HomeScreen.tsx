import React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, Text, SafeAreaView, View, Linking, TouchableOpacity } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Country, getCountries } from './client';
import { windowHeight, windowWidth } from './constants';
import FloatButton from './FloatButton';
import { getScreenStyle } from './misc/getScreenStyle';
type Link = string | null
type PropsRouter = { code: string }
type CombinedPropsRouter = PropsRouter | Country
export const HomeScreen: NavigationFunctionComponent<Props> = (props) => {

  const [countries, setCountries] = useState<Array<Country>>([])
  const [page, setPage] = useState<number>(0)
  const [size] = useState<number>(20)
  useEffect(() => {
    Linking.getInitialURL().then((link: Link) => {
      if (link) {
        const linkSplit = link.split('/')
        if (linkSplit[2].toLocaleLowerCase() == 'country') {
          sendToDetail({ code: linkSplit[3] })
        } else if (linkSplit[2].toLocaleLowerCase() == 'continent') {
          Navigation.push(props.componentId, {
            component: {
              name: 'ListCountryScreen',
              passProps: {
                continentCode: linkSplit[3],
              }
            }
          });
        }
      } else {
        fetch(0)
      }
    })

  }, [])

  const fetch = (page: number) => {
    getCountries(page, size).then((res: Array<Country>) => {
      setPage(page + 1)
      setCountries(prevCountries => {
        return [...prevCountries, ...res]
      })
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

  const sendToDetail = (country: CombinedPropsRouter) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'DetailScreen',
        passProps: {
          code: country.code,
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
      maxWidth: windowWidth - 20,
      shadowRadius: 3.84,
      elevation: 3,
      paddingLeft: 5,
      zIndex:1,
      flexDirection: 'row'
    }}
      onPress={sendToDetail.bind(null, item)}
    >
      <Text style={{
        fontSize: 90, height: 80, lineHeight: 65,
        paddingTop: 90 - (90 * 0.7),
      }}>{item.emoji}</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'center', maxWidth: windowWidth - 80 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 20, color: '#868686' }}>{item.capital}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root>
        <FloatButton />
        <FlatList
          data={countries}
          keyExtractor={(item: Country) => item.code}
          {...{ renderItem, ListHeaderComponent }}
          onEndReached={fetch.bind(null, page + 1)}
          onEndReachedThreshold={0.5}
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
