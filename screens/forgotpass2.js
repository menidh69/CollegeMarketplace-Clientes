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
import { isEmptyNull } from '../validation/formValidation'
import ErrorModal from '../components/ErrorModal';

const forgotpass2 = (email) => {
  return (
    <Body email={email.route.params} />
  );
}


const Body = ({ email }) => {
  const navigation = useNavigation();
  const [showmodal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [codigo, setCodigo] = useState("");

  //console.log("CORRREO ", email);

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
          }
        })

    } catch (err) {
      console.log(err)
      setShowModal(true);
      setModalMessage("caramba hubo un error intenta + tarde")
    }
  }

  const reestablecer = () => {
    if (isEmptyNull(codigo)) {
      setShowModal(true);
      setModalMessage("Ingresa el codigo zokete")
      return
    }
    navigation.navigate('Forgotpass3', codigo)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}> Código </Text>
      <Text style={styles.descripcion}> Ingresa el código que te enviamos por correo electrónico</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Código"
          placeholderTextColor="#909090"
          onChangeText={(codigo) => setCodigo(codigo)}
        />
      </View>

      <TouchableOpacity onPress={() => enviar()}>
        <Text style={styles.forgot_button}>Reenviar código</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.enviarBtn} onPress={() => reestablecer()}>
        <Text style={styles.enviarText}>Siguiente</Text>
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
    fontWeight: "bold",
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
    textDecorationLine: "underline",
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

export default forgotpass2;