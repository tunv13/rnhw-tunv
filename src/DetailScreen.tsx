import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Country, getCountryByCode } from './client'
import styled from 'styled-components/native'
import { windowWidth } from './constants'
import { Navigation } from 'react-native-navigation'
import { getTheme, setTheme, ValueTheme } from './helpers/storage'
import FloatButton from './FloatButton'

type Props = {
    continentName: string,
    continentCode: string,
    componentId: string
}

type CombinedProps = Country & Props

export default function DetailScreen({ componentId, code }: CombinedProps) {
    const [country, setCountry] = useState<Country>()
    const [theme, setThemeState] = useState(ValueTheme.LIGHT)
    useEffect(() => {

        checkTheme()
        getCountryByCode(code).then(country => setCountry(country))
    }, [code])

    const checkTheme = async () => {
        const theme = await getTheme()
        setThemeState(theme == ValueTheme.DARK ? theme : ValueTheme.LIGHT)
    }

    const changeTheme = (value: ValueTheme) => {
        setTheme(value)
        setThemeState(value)
    }
    const viewList = () => {
        Navigation.push(componentId, {
            component: {
                name: 'ListCountryScreen',
                passProps: {
                    continentName: country?.continent?.name,
                    continentCode: country?.continent?.code
                }
            }
        })
    }
    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: theme == ValueTheme.DARK ? "black" : 'white',
            flex: 1, alignItems: 'center'
        }}>
            <FloatButton theme={theme}
                changeTheme={changeTheme}
            />
            <Text style={{ fontSize: 80, color: theme == ValueTheme.DARK ? "white" : 'black' }}>{country?.emoji}</Text>
            <Text style={{
                fontSize: 24,
                color: theme == ValueTheme.DARK ? "white" : 'black',
                fontWeight: 'bold'
            }}>{country?.name}</Text>
            <Row>
                <Text style={{ color: theme == ValueTheme.DARK ? "white" : 'black' }}>alpha2Code</Text>
                <Text style={{ color: theme == ValueTheme.DARK ? "white" : 'black' }}>{code}</Text>
            </Row>
            <Row>
                <Text style={{ color: theme == ValueTheme.DARK ? "white" : 'black' }}>callingCodes</Text>
                <Text style={{ color: theme == ValueTheme.DARK ? "white" : 'black' }}>+{country?.phone}</Text>
            </Row>
            <Row>
                <Text style={{ color: theme == ValueTheme.DARK ? "white" : 'black' }}>alpha2Code</Text>
                <TouchableOpacity onPress={viewList}>
                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>{country?.continent?.name}</Text>
                </TouchableOpacity>
            </Row>
        </View>
    )
}


const Row = styled.View`
    width:${windowWidth - 16}px
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`;
