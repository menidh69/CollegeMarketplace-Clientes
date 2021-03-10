import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function enviar() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>CREAR CUENTA </Text>
      <Text style={styles.titulo1}> Introduce tus datos para registrarte </Text>
        <TouchableOpacity>
        <Text style={styles.forgot_button}>¿Ya tienes una cuenta?</Text>
      </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Siguiente</Text>
      </TouchableOpacity>
                  <TouchableOpacity style={styles.faceBtn}>
        <Text style={styles.loginText}>Conectarse con facebook</Text>
      </TouchableOpacity>



      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          label ="Nombre"
          placeholder="Nombre"
          placeholderTextColor="#909090"
        />
      </View>

      <View style={styles.inputView1}>
        <TextInput
          style={styles.TextInput}
          label ="Email"
          placeholder="Email"
          placeholderTextColor="#909090"
        />
      </View>

            <View style={styles.inputView2}>
        <TextInput
          style={styles.TextInput}
          label ="Contraseña"
          placeholder="Contraseña"
          placeholderTextColor="#909090"
        />
      </View>
            <View style={styles.inputView3}>
        <TextInput
          style={styles.TextInput}
          label ="Repetir Contraseña"
          placeholder="Repetir contraseña"
          placeholderTextColor="#909090"
        />
      </View>
            <View style={styles.inputView4}>
        <TextInput
          style={styles.TextInput}
          label ="Telefono"
          placeholder="Telefono"
          placeholderTextColor="#909090"
        />
      </View>
            <View style={styles.inputView5}>
        <TextInput
          style={styles.TextInput}
          label ="Seleccionar Universidad"
          placeholder="Seleccionar Universidad"
          placeholderTextColor="#909090"
        />
      </View>





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0D5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },



  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left:30,
  },
    titulo1: {
    fontSize: 15,
    fontWeight: '',
    position: 'absolute',
    top: 85,
    left:30,
  },
    forgot_button: {
    fontSize: 12,
    fontWeight: ' ',
    position: 'absolute',
    color: 'blue',
    textDecorationLine: 'underline',
    top: 15,
    left:-130,
  },




  inputView: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:-5,
  },

    inputView1: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:0,
  },
      inputView2: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:5,
  },
      inputView3: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:10,
  },
      inputView4: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:15,
  },
      inputView5: {
    backgroundColor: '#E2DFDF',
    borderRadius: 15,
    width: 300,
    height: 37,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    bottom:20,
  },

    TextInput: {
    height: 50,
    flex: 1,
    padding: 0,
    marginRight: 80,
    fontWeight: '600',
    fontSize: 15,
    right: 20,
  },
   loginBtn: {
        width: "90%",
        borderRadius: 25,
        height: 35,
        top:390,
        backgroundColor: "#E99125",
    },
       faceBtn: {
        width: "90%",
        borderRadius: 25,
        height: 35,
        top:400,
        backgroundColor: "#4267B2",
    },

    loginText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "",
    alignSelf: "center",
    textTransform: "uppercase"
  }

});
