import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, } from 'react-native';


export default function landing() {
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
        <StatusBar style="auto" />
          <TouchableOpacity
            style={styles.loginBtn}
            >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E6995',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width:220,
    height:200,
  },
  signupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FFAF4C",
    fontWeight: "bold",

  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#B1D8EE",
    fontWeight: "bold",
  },
});
