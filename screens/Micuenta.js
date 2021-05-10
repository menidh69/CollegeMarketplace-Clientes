import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import AgregarTarjeta from "./AgregarTarjeta";
import AndroidTarjeta from "./AndroidTarjeta";
import LoadingModal from "../components/LoadingModal";

const Stack = createStackNavigator();

const Micuenta = () => {
  const { user, setUser } = useContext(UserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchitems().then((json) => {
        setCards(json);
      });
    }
    return () => (isMounted = false);
  }, []);

  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/cards/${user.id}`
    );
    const it = await data.json();
    console.log(it.tarjeta);
    return it.tarjeta;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cuenta"
        children={() => <MicuentaScreen user={user} cards={cards} />}
        initialParams={{ user: user }}
        options={{
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="AgregarTarjeta"
        component={Platform.OS === "ios" ? AgregarTarjeta : AndroidTarjeta}
        initialParams={{ user: user }}
        options={{
          animationEnabled: false,
          title: "Agregar Tarjeta",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
};

const MicuentaScreen = ({ user, cards }) => {
  const navigation = useNavigation();

  var num_sf = user.telefono;
  var num_cf = "";
  num_cf = "(" + num_sf.substring(0, 3) + ") ";
  num_cf += num_sf.substring(3, 6) + " ";
  num_cf += num_sf.substring(6, 10);
  const [refreshPage, setRefreshPage] = useState("");

  return (
    <View style={styles.container}>
      <List.Section style={styles.datosPersonales}>
        <List.Accordion
          title="Detalles personales"
          style={{ borderRadius: 25 }}
        >
          <View style={styles.detallesContainer}>
            <View style={styles.imagen}></View>
            <View style={styles.datosPersonalesList}>
              <Text>
                {user.nombre} {user.apellidos}
              </Text>
              <Text>{user.email}</Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <Text>{num_cf}</Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </View>
        </List.Accordion>
      </List.Section>
      {/* <List.Section style={styles.datosPersonales}>
        <List.Accordion title="Ordenes" style={{ borderRadius: 25 }}>
          <View style={styles.detallesContainer}>
            <View style={styles.imagen}></View>
            <View style={styles.datosPersonalesList}>
              <Text>Tarjetas</Text>
            </View>
          </View>
        </List.Accordion>
      </List.Section> */}
      <List.Section style={styles.datosPersonales}>
        <List.Accordion
          title="Información bancaria"
          style={{ color: "white" }}
        >
          <View style={styles.informacionBancaria}>
            <View style={styles.tarjetasContainer}>
              <Text
                style={{
                  marginTop: -10,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {(cards !== undefined && cards.length !== 0) ? "Mis tarjetas guardadas" : "No hay Tarjetas"}
              </Text>
              {(cards !== undefined && cards.length !== 0) ? <Tarjeta card={cards} /> : <></>}
              <View style={styles.agregarTarjetaBtnContainer}>
                <TouchableOpacity
                  style={styles.agregarTarjetaBtn}
                  onPress={() => navigation.navigate("AgregarTarjeta")}
                >
                  <Text style={styles.textoBtn}>
                    Agregar Tarjeta
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </List.Accordion>
      </List.Section>
      <TouchableOpacity
        style={styles.bajaBtn}
        onPress={() =>
          Alert.alert(
            "Eliminar Cuenta",
            "¿Estas seguro de quieres eliminar tu cuenta? Te extrañaremos",
            [
              {
                text: "Cancelar",
                onPress: () => {
                  setRefreshPage("refresh");
                },
              },
              {
                text: "Si",
                onPress: () => {
                  EliminarCuenta();
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Text style={styles.textoBtn}>Dar de Baja</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.reset({ routes: [{ name: "Landing" }] })}
      >
        <Text style={styles.textoBtn}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tarjeta = ({ card }) => {
  var num_sf = card.card_number;
  var num_cf = "";
  num_cf = "" + num_sf.substring(12, 16);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  var url_icon = `../assets/${card.brand}.png`;
  console.log(url_icon);

  const borrarTarjeta = async () => {
    console.log("HOLA el id a eliminar es ", card.id);
    setModalShow(true);
    setLoading(true);
    setMessage("Eliminando");
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/cards/${card.id}`,
      {
        method: "DELETE",
      }
    );
    const resp = await datos.json();
    if (resp.error) {
      setLoading(false);
      setMessage("Ocurrio un error: " + resp.error);
      return;
    }
    setMessage("");
    setLoading(false);
    setModalShow(false);
    return;
  };


  return (
    <View style={styles.cardContainer}>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        **** **** ****{" "}
      </Text>
      <Text>{num_cf}</Text>
      <Image style={styles.imageCard} source={require(`../assets/visa.png`)} />
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          marginLeft: 5,
          padding: 10,
          borderRadius: 30
        }}
        onPress={borrarTarjeta}
      >
        <Text style={styles.textoBtn}>Borrar</Text>
      </TouchableOpacity>
      <LoadingModal
        show={modalShow}
        setShow={setModalShow}
        loading={loading}
        message={message}
      ></LoadingModal>
    </View>
  );
};


const EliminarCuenta = async (id) => {
  console.log("hola");
  const eliminar = await fetch(
    `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/usuariosdelete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const resp = await eliminar.json();
  console.log(resp);

  navigation.reset({ routes: [{ name: "Landing" }] });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  datos: {
    fontSize: 24,
    color: "white"
  },
  datosPersonales: {
    backgroundColor: "#5c9ec4",
    borderRadius: 25,
    width: "85%",
    color: "white"
  },
  datosPersonalesList: {
    padding: 10,
    marginTop: -10,
  },
  imagen: {
    width: 50,
    height: 75,
    marginTop: -10,
    backgroundColor: "black",
  },
  detallesContainer: {
    flexDirection: "row",
    //justifyContent: "center",
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
  },
  informacionBancaria: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  tarjetasContainer: {
    //padding: 10,
    width: "80%",
  },
  agregarTarjetaBtnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  agregarTarjetaBtn: {
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#16b585",
  },
  textoBtn: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
  },
  logoutBtn: {
    marginTop: 20,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#de3535",
  },
  bajaBtn: {
    marginTop: 20,
    width: "40%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "black",
  },
  imageCard: {
    width: 33,
    height: 33,
    borderRadius: 10,
  },
  cardContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 5,
    marginTop: 20,
  },
});

export default Micuenta;
