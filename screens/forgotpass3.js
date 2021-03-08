import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function enviar() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}> Restablecer contraseña </Text>
      <Text style={styles.titulo2}> Nueva contraseña </Text>
      <Text style={styles.descripcion}>
        Introduce tu nueva contraseña para tu cuenta
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nueva contraseña"
          placeholderTextColor="#909090"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Repetir contraseña"
          placeholderTextColor="#909090"
        />
      </View>

      <TouchableOpacity style={styles.enviarBtn}>
        <Text style={styles.enviarText}>Confirmar</Text>
      </TouchableOpacity>
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

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 60,
  },

  titulo2: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 150,
    left: 30,
  },

  descripcion: {
    fontSize: 17,
    position: "absolute",
    top: 200,
    paddingLeft: 30,
    paddingRight: 56,
  },

  inputView: {
    backgroundColor: "#E2DFDF",
    borderRadius: 15,
    width: 315,
    height: 46,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#9C9C9C",
    borderWidth: 1,
    bottom: 60,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginRight: 40,
    fontWeight: "600",
    fontSize: 15,
    right: 20,
  },

  enviarBtn: {
    width: 253,
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#E99125",
    bottom: 76,
  },

  enviarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Montserrat",
  },
});
