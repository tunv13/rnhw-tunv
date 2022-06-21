import React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, Text, SafeAreaView, View, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { Country, getCountries } from './client';
import { windowHeight, windowWidth } from './constants';
import FloatButton from './FloatButton';
import { getTheme, setTheme, ValueTheme } from './helpers/storage';
import { getScreenStyle } from './misc/getScreenStyle';
type Link = string | null
type PropsRouter = { code: string }
type Props = {}
type CombinedPropsRouter = PropsRouter | Country
export const HomeScreen: NavigationFunctionComponent<Props> = (props) => {

  const [countries, setCountries] = useState<Array<Country>>([])
  const [theme, setThemeState] = useState(ValueTheme.LIGHT)
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

      checkTheme()
    })
  }, [])

  const checkTheme = async () => {
    const theme = await getTheme()
    setThemeState(theme == ValueTheme.DARK ? theme : ValueTheme.LIGHT)
  }

  const changeTheme = (value: ValueTheme) => {
    setTheme(value)
    setThemeState(value)
  }

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
      backgroundColor: theme == ValueTheme.DARK ? "black" : 'white',
      shadowColor: theme == ValueTheme.DARK ?"#fff":"#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      maxWidth: windowWidth - 20,
      shadowRadius: 3.84,
      elevation: 3,
      paddingLeft: 5,
      zIndex: 1,
      flexDirection: 'row'
    }}
      onPress={sendToDetail.bind(null, item)}
    >
      <Text style={{
        fontSize: 90, height: 80, lineHeight: 65,
        paddingTop: 90 - (90 * 0.7),
      }}>{item.emoji}</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'center', maxWidth: windowWidth - 80 }}>
        <Text style={{
          fontSize: 20, fontWeight: 'bold', color: theme == ValueTheme.DARK ? "white"
            : 'black'
        }}>{item.name}</Text>
        <Text style={{ fontSize: 20, color: '#868686' }}>{item.capital}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.root, theme == ValueTheme.DARK && {
        backgroundColor: 'black'
      }]}>
        <FloatButton theme={theme}
          changeTheme={changeTheme}
        />
        <FlatList
          data={countries}
          keyExtractor={(item: Country) => item.code}
          {...{ renderItem, ListHeaderComponent }}
          onEndReached={fetch.bind(null, page + 1)}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
//#region

HomeScreen.options = getScreenStyle();
//#endregion
