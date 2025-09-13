import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  Stack } from 'expo-router'

const _layout = () => {
  return (
        <Stack>
            <Stack.Screen name='index' options={
                {
                    title:'Home'
                }
            }></Stack.Screen>
                  <Stack.Screen name='about' options={
                {
                    title:'About Us',
                }
            }></Stack.Screen>
                     <Stack.Screen name='counter' options={
                {
                    title:'Use State Demo',
                }
            }></Stack.Screen>
        </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({
    rootLayout:{
        flex:1,
        alignContent:"center",
        alignItems:"center"
    },
      myText:{
        fontWeight:"600",
        fontSize:40
    }
})