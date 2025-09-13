import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const About = () => {
  return (
    <View style={styles.myview}>
      <Text style={styles.myText}>About Us</Text>
      
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    myview:{
      flex:1,
        justifyContent:"center",
        verticalAlign:"middle",
        alignSelf:"center",
        alignContent:"center"
    },
    myText:{
        fontWeight:"600",
        fontSize:40
    }
})