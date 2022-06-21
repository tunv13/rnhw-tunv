import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { windowHeight, windowWidth } from './constants'
import { Country, getCountriesWithContinent } from './client'
import { Navigation } from 'react-native-navigation'
import FloatButton from './FloatButton'
import { getTheme, setTheme, ValueTheme } from './helpers/storage'
type PropsListCountry = {
  continentCode: string
  continentName: string
  componentId: string
}
export default function ListCountryScreen({ componentId, continentCode, continentName }: PropsListCountry) {
  const [countries, setCountries] = React.useState<Array<Country>>([])
  const [theme, setThemeState] = useState(ValueTheme.LIGHT)
  const [continentDisplayName, setContinentDisplayName] = useState<string>(continentName)
  useEffect(() => {
    getCountriesWithContinent(continentCode).then(res => {
      setCountries(res)
      if (Array.isArray(res) && res.length > 0) {
        setContinentDisplayName(res[0].continent.name)
      }
    })

    checkTheme()
  }, [continentCode])

  const pressCountry = (country: Country) => {
    Navigation.push(componentId, {
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


  const checkTheme = async () => {
    const theme = await getTheme()
    setThemeState(theme == ValueTheme.DARK ? theme : ValueTheme.LIGHT)
  }

  const changeTheme = (value: ValueTheme) => {
    setTheme(value)
    setThemeState(value)
  }

  return (
    <><FloatButton theme={theme}
      changeTheme={changeTheme}
    />
      <ScrollView >
        <View style={{
          flex: 1, flexDirection: 'column',
          backgroundColor:theme == ValueTheme.DARK ? 'black':'white',
          alignItems: 'center'
        }}>

          <Text style={{ fontSize: 30, fontWeight: 'bold',
          color:theme == ValueTheme.DARK ?'white':'black',
          margin: 10 }}>{continentDisplayName}</Text>
          <Row>
            <Text style={{ color:theme == ValueTheme.DARK ?'white':'black'}}>alpha2Code</Text>
            <Text style={{ color:theme == ValueTheme.DARK ?'white':'black'}}>{continentCode}</Text>
          </Row>
          <Row>
            <Text style={{ color:theme == ValueTheme.DARK ?'white':'black'}}>countries</Text>
            <View>
              {countries.map(item => <TouchableOpacity
                key={item.code}
                onPress={pressCountry.bind(null, item)}
              ><Text style={{
                textAlign: 'right',
                color: 'blue',
                textDecorationLine: 'underline'
              }}>{item.name}</Text></TouchableOpacity>)}
            </View>
          </Row>
        </View>
      </ScrollView>
    </>
  )
}
const Row = styled.View`
    width:${windowWidth - 16}px
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`;