import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Image
        source={require('../assets/email.png')}
        style={styles.icono}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <Image
        source={require('../assets/padlock.png')}
        style={styles.icono}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.fbView}>
        <Image
        source={require('../assets/fbicon.png')}
        style={styles.fbIconoStyle}
        />
      <TouchableOpacity style={styles.fbBtn}>
        <Text style={styles.loginText}>Conectarse con Facebook</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    width: '30%',
    height: '15%'
  },

  icono: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },

  inputView: {
    backgroundColor: "#E2DFDF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E99125",
  },
  loginText: {
    color: "white",
  },
  fbView: {
    backgroundColor: "#4267B2",
    borderRadius: 30,
    width: "80%",
    height: 50,
    marginBottom: 20,
    marginTop:30,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  },
  fbBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  fbIconoStyle: {
      width: 25,
      height: 25,
  }
});

export default Login;