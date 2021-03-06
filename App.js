import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './screens/landing'




export default function App() {

  return (
      <>
        <Landing/>
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
