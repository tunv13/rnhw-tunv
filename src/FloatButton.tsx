import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function FloatButton() {

  return (
    <TouchableOpacity
    onPress={()=>AsyncStorage.getItem('').then(res=>console.log(res)
        )}
    style={{position:'absolute',width:50,
    borderRadius:25,
    height:50,backgroundColor:'black',
    zIndex:2,
    bottom:30,right:10}}>
      {/* <Text>FloatButton</Text> */}
    </TouchableOpacity>
  )
}