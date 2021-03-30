import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { emailValidation, isEmptyNull } from '../validation/formValidation'
import ErrorModal from '../components/ErrorModal';


const forgotpass1 = () => {
  return (
    <Body />
  );
}

const Body = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [showmodal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validar = () => {
    if (isEmptyNull(email)) {
      setShowModal(true);
      setModalMessage("Ingresa un correo un valido")
      return
    }
    if (!emailValidation(email)) {
      setModalMessage("El formato de tu correo es incorrecto")
      setShowModal(true);
      return
    }
    return enviar();
  }

  const enviar = async () => {
    try {
      const body = {
        email: email
      }
      console.log("body", body)
      const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/olvidarcontra',
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
            navigation.navigate('Forgotpass2', email)
          }
        })

    } catch (err) {
      console.log(err)
      setShowModal(true);
      setModalMessage("caramba hubo un error intenta + tarde")
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}> Olvidaste tu contraseña? </Text>
      <Text style={styles.descripcion}>
        Introduce tu correo y te enviaremos un código para reestablecer tu contraseña.
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Correo electrónico"
          placeholderTextColor="#909090"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <TouchableOpacity style={styles.enviarBtn} onPress={() => validar()}>
        <Text style={styles.enviarText}>Enviar Correo</Text>
      </TouchableOpacity>
      <ErrorModal setShow={setShowModal} show={showmodal} message={modalMessage}></ErrorModal>
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
    fontWeight: 'bold',
    marginTop: -100,
  },

  descripcion: {
    fontSize: 17,
    padding: 50,
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
    marginTop: 40,
    backgroundColor: "#E99125",
  },

  enviarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default forgotpass1;