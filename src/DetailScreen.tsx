import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Country, getCountryByCode } from './client'
import styled from 'styled-components/native'
import { windowWidth } from './constants'
import { Navigation } from 'react-native-navigation'

type Props = {
    continentName: string,
    continentCode: string,
    componentId: string
}

type CombinedProps = Country & Props

export default function DetailScreen({ componentId, code }: CombinedProps) {
    const [country, setCountry] = useState<Country>()

    useEffect(() => {
        getCountryByCode(code).then(country => setCountry(country))
    }, [code])
    const viewList = () => {
        Navigation.push(componentId, {
            component: {
                name: 'ListCountryScreen',
                passProps: {
                    continentName:country?.continent?.name,
                    continentCode: country?.continent?.code
                }
            }
        })
    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: 80 }}>{country?.emoji}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{country?.name}</Text>
            <Row>
                <Text>alpha2Code</Text>
                <Text>{code}</Text>
            </Row>
            <Row>
                <Text>callingCodes</Text>
                <Text>+{country?.phone}</Text>
            </Row>
            <Row>
                <Text>alpha2Code</Text>
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
