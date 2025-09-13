import { Button, StyleSheet, Text, View } from 'react-native'
import React , {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
const Counter = () => {
  const [count, setCount]=useState(0);
   const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  const incCounter=()=>{
    setCount(count+1);
  }
  const decCounter=()=>{
    const updatedCount=count-1>=0?count-1:0;
    setCount(updatedCount);
  }
  return (
    <View style={styles.myview}>
      <Text style={styles.myText}>Counter {count}</Text>
      <Button title="Increment" onPress ={incCounter} />
       <Button title="Decrement" onPress ={decCounter} />
   </View>
  )
}

export default Counter

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

