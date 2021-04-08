import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import Base64 from "../utils/Base64";
import LoadingModal from "../components/LoadingModal";

const AndroidTarjeta = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const htmlView = `
    <html>
    <head>
    <script type="text/javascript"
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript"
          src="https://js.openpay.mx/openpay.v1.min.js"></script>
  <script type='text/javascript'
    src="https://js.openpay.mx/openpay-data.v1.min.js"></script>
  </head>
  <body>
  <form id="payment-form">
  <h1>Holis
  </h1>
  </form>
  <script type="text/javascript">
 $(document).ready(function() {
  OpenPay.setId('mzow0ra2mxgbaxeyu2uh');
  OpenPay.setApiKey('pk_4e68e20145694123b490d05d002abdf1');
  var deviceSessionId = OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
  window.ReactNativeWebView.postMessage(deviceSessionId);
  });

</script>
  <body>
  </html>
  
  `;
  const [datosTarjeta, setDatosTarjeta] = useState({
    holder_name: user.nombre + " " + user.apellidos,
    card_number: "",
    cvv2: "",
    expiration_month: "",
    expiration_year: "",
    device_session_id: "",
  });

  const [datosGuardar, setDatosGuardar] = useState({
    user_id: user.id,
    nombre: user.nombre + " " + user.apellidos,
    email: user.email,
    device_session_id: "",
    token_id: "",
  });

  const getToken = async () => {
    const encoded = Base64.btoa("pk_4e68e20145694123b490d05d002abdf1:");
    console.log(encoded);
    const openpaytoken = await fetch(
      "https://sandbox-api.openpay.mx/v1/mzow0ra2mxgbaxeyu2uh/tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + encoded,
        },
        body: JSON.stringify(datosTarjeta),
      }
    );
    const json = await openpaytoken.json();
    console.log(json);
    return json;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setShowModal(true);
    setMessage("Guardando...");
    getToken().then(async (json) => {
      let body = datosGuardar;
      body.token_id = json.id;
      console.log(body);
      const openpaytoken = await fetch(
        "http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/savecard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const resp = await openpaytoken.json();
      if (resp.error) {
        setLoading(false);
        setMessage("Oucrrió un error al guardar la tarjeta: " + resp.error);
        console.log(resp);
        return;
      }
      setLoading(false);
      setMessage("");
      setShowModal(false);
      console.log(resp);
      navigation.reset({
        routes: [{ name: "Cuenta" }],
      });
      return;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agrega tu tarjeta</Text>
      <Text style={styles.subtitle}>
        Ingresa una tarjeta para continuar con el registro informacion bancaria
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          setDatosTarjeta({ ...datosTarjeta, card_number: value })
        }
        placeholder={"XXXX-XXXX-XXXX-XXXX"}
        maxLength={20}
      ></TextInput>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setDatosTarjeta({ ...datosTarjeta, expiration_month: value })
          }
          placeholder={"MM/"}
          maxLength={2}
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setDatosTarjeta({ ...datosTarjeta, expiration_year: value })
          }
          placeholder={"YY"}
          maxLength={2}
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setDatosTarjeta({ ...datosTarjeta, cvv2: value })
          }
          placeholder={"CVV2"}
          maxLength={4}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => handleSubmit()}
      >
        <Text>Guardar</Text>
      </TouchableOpacity>
      <LoadingModal
        loading={loading}
        show={showModal}
        setShow={setShowModal}
        message={message}
      ></LoadingModal>
      <WebView
        source={{ html: htmlView }}
        style={{ height: 0, width: 0 }}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          setDatosGuardar({ ...datosGuardar, device_session_id: data });
        }}
      ></WebView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
  },

  btnPrimary: {
    marginTop: 20,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#E99125",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 20,
    margin: 10,
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
});

export default AndroidTarjeta;
