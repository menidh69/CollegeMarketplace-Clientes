import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';




const Home = () => {

  return (
      <>
        <View>
            <Text>Hola este es el inicio</Text>
        </View>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E6995',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;