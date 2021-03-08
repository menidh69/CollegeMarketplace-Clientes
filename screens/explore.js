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

      <Text style={styles.titulo}> Explorar </Text>
      <Text style={styles.titulo2}> Búsqueda rápida </Text>
      <Text style={styles.titulo3}> Tiendas Populares </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="¿Qué estás buscando?"
          placeholderTextColor="#909090"
        />
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

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 90,
    left: 30,
  },

  titulo2: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 250,
    left: 30,
  },

  titulo3: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 480,
    left: 30,
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
    bottom: 240,
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
});
    