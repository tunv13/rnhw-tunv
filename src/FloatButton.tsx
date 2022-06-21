import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValueTheme } from './helpers/storage';
export default function FloatButton({ theme, changeTheme }: { theme: ValueTheme, changeTheme: (value: ValueTheme) => void }) {
    const pressChange = () => {
        changeTheme(theme == ValueTheme.LIGHT ? ValueTheme.DARK : ValueTheme.LIGHT)
    }
    return (
        <TouchableOpacity
            onPress={pressChange}
            style={{
                position: 'absolute', width: 50,
                borderRadius: 25,
                height: 50, backgroundColor: theme == ValueTheme.LIGHT ? 'black' : 'white',
                zIndex: 2,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center',
                bottom: 30, right: 10
            }}>
            <Text style={{ color: theme == ValueTheme.LIGHT ? 'white' : 'black', fontSize: 20 }}>C</Text>
        </TouchableOpacity>
    )
}

