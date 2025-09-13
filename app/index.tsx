import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
const Home = () => {
  return (
    <View style={styles.myview}>
      <Text style={styles.myText}>Home</Text>
        <Link href='/about'>About</Link>
        <Link href='/counter'>Counter</Link>

    </View>
  )
}

export default Home

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