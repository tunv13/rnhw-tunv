import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Country } from './client'
import styled from 'styled-components/native'
import { windowWidth } from './constants'
import { Navigation } from 'react-native-navigation'

type Props = {
    continentName: string,
    continentCode: string,
    componentId: string
}

type CombinedProps = Country & Props

export default function DetailScreen({ componentId, code, name, emoji, phone, continentName, continentCode }: CombinedProps) {

    const viewList = () => {
        Navigation.push(componentId, {
            component: {
                name: 'ListCountryScreen',
                passProps: {
                    continentCode,
                    continentName
                }
            }
        })
    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: 80 }}>{emoji}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
            <Row>
                <Text>alpha2Code</Text>
                <Text>{code}</Text>
            </Row>
            <Row>
                <Text>callingCodes</Text>
                <Text>+{phone}</Text>
            </Row>
            <Row>
                <Text>alpha2Code</Text>
                <TouchableOpacity onPress={viewList}>
                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>{continentName}</Text>
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
