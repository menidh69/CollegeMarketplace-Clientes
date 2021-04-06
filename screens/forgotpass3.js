import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isEmptyNull, repeatPassword, limit } from '../validation/formValidation'
import ErrorModal from '../components/ErrorModal'


const forgotpass3 = (codigo) => {
  return (
    <Body codigo={codigo.route.params} />
  );
}

const Body = ({ codigo }) => {

  console.log("ESTO CODIGOo ? ", codigo)
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [message, setModalMessage] = useState("");
  const [datos, setDatos] = useState({
    "contraseña": "",
    "repetirContraseña": "",
  });

  const validar = () => {
    if (isEmptyNull(datos.contraseña) || isEmptyNull(datos.repetirContraseña)) {
      setShowModal(true);
      setModalMessage("Debes llenar todos los campos")
      return
    }
    if (!repeatPassword(datos.contraseña, datos.repetirContraseña)) {
      setShowModal(true);
      setModalMessage("Tus contraseñas no coinciden")
      return
    }
    return reestablecer();
  }

  const reestablecer = async () => {
    try {
      const body = {
        password: datos.contraseña,
        token: codigo
      }
      console.log("body", body)
      const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/new-password',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        .then(async resp => {
          const result = await resp.json()
          if (result.error) {
            console.log(result.error)
          } else {
            console.log(result)
            navigation.navigate('Login')
          }
        })

    } catch (err) {
      console.log(err)
      setShowModal(true);
      setModalMessage("codigo incorrecto?")
    }
  }


  const handleInput = (text, type) => {
    switch (type) {
      case "contraseña":
        if (!limit(text, 25)) {
          setDatos({ ...datos, "contraseña": text })
        }
        return
      case "repetirContraseña":
        if (!limit(text, 25)) {
          setDatos({ ...datos, "repetirContraseña": text })
        }
        return
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}> Nueva contraseña </Text>
      <Text style={styles.descripcion}>
        Introduce tu nueva contraseña para tu cuenta
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nueva contraseña"
          placeholderTextColor="#909090"
          secureTextEntry={true}
          onChangeText={text => handleInput(text, "contraseña")}
          value={datos.contraseña}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Repetir contraseña"
          placeholderTextColor="#909090"
          secureTextEntry={true}
          onChangeText={text => handleInput(text, "repetirContraseña")}
          value={datos.repetirContraseña}
        />
      </View>

      <TouchableOpacity style={styles.enviarBtn} onPress={() => validar()}>
        <Text style={styles.enviarText}>Confirmar</Text>
      </TouchableOpacity>
      <ErrorModal message={message} show={showModal} setShow={setShowModal} />
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
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -100,
  },
  descripcion: {
    fontSize: 17,
    paddingBottom: 20,
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
  },

  TextInput: {
    height: 50,
    fontSize: 15,
  },

  enviarBtn: {
    width: 253,
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E99125",
  },

  enviarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default forgotpass3;