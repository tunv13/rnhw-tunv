import AsyncStorage from "@react-native-async-storage/async-storage";
const ThemeKey = '@theme'

export enum ValueTheme {
    DARK = 'dark',
    LIGHT = 'light'
}
const getTheme = () => {
    return AsyncStorage.getItem(ThemeKey)
}
const setTheme = (value: ValueTheme) => {
    AsyncStorage.setItem(ThemeKey, value)
}

export {
    getTheme,setTheme
}