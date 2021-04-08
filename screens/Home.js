import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import { UserContext } from "../UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Micuenta from "./Micuenta";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Micarrito from "./Micarrito";

import { createStackNavigator } from "@react-navigation/stack";
import MenuTienda from "./MenuTienda";
import { useNavigation } from "@react-navigation/native";
import ProductoInfo from "./ProductoInfo";
import Pedidos from "./Pedidos";
import PerfilTienda from "./PerfilTienda";
import FiltroTienda from "./FiltroTienda";
import FiltroProducto from "./FiltroProducto";
import Busqueda from "./Busqueda";
import PedidosAnteriores from './PedidosAnteriores';



const Tienda = ({ tienda }) => {
  const navigation = useNavigation();

  var tipoTienda = "";

  switch (tienda.id_tipo_tienda) {
    case 1:
      tipoTienda = "Cooperativa";
      break;

    case 2:
      tipoTienda = "Puesto";
      break;
    case 3:
      tipoTienda = "Cafetería";
      break;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("PerfilTienda", { tienda: tienda })}
      >
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={styles.productoContainer}>
            <Image
              style={styles.imageProducto}
              source={{
                uri: tienda.url_imagen
                  ? tienda.url_imagen
                  : "../assets/restaurant.png",
              }}
              defaultSource={require("../assets/restaurant.png")}
            />
            <View style={styles.textoProductoContainer}>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
                {tienda.nombre}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            ></View>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 30,
              marginRight: 30,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const Home = ({ route }) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#1E6995",
          activeBackgroundColor: "#C0D5E1",
          inactiveBackgroundColor: "#C0D5E1",
          inactiveTintColor: "#000",
          style: {
            backgroundColor: "#C0D5E1",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          children={() => <Explorar />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Buscar"
          children={() => <Busqueda />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Pedidos"
          children={() => <Pedidos />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="ticket" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Carrito"
          children={() => <Micarrito />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cuenta"
          children={() => <Micuenta />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const Stack = createStackNavigator();

const Explorar = ({ user }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }

                    }

                }}
            />
            <Stack.Screen
                name="PerfilTienda"
                component={PerfilTienda}
                options={{
                    title: 'Perfil Tienda',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="MenuTienda"
                component={MenuTienda}
                options={{
                    title: 'Menú Tienda',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="ProductoInfo"
                component={ProductoInfo}
                options={{
                    title: 'Menu',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    }
                }}
            />
            <Stack.Screen
                name="FiltroTienda"
                component={FiltroTienda}
                options={{
                    title: 'Selecciona una tienda',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="FiltroProducto"
                component={FiltroProducto}
                options={{
                    title: 'Productos por categoria',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="PedidosAnteriores"
                component={PedidosAnteriores}
                options={{
                    title: 'Pedidos Anteriores',
                    headerStyle: {
                        backgroundColor: '#C0D5E1',
                        shadowOffset: {
                            height: 0
                        }
                    },
                    headerTintColor: 'black'
                }}
            />
        </Stack.Navigator>
    );
}

  const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchitems();
  }, []);

  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas`)
    const it = await data.json();
    console.log(it);
    setItems(it);
  };

  return (
    <ScrollView style={styles.containerS}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text style={styles.titulo}> Explorar </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="¿Qué estás buscando?"
            placeholderTextColor="#909090"
            // aqui
          />
        </View>

        <Text style={styles.titulo2}> Búsqueda rápida </Text>

        <TouchableOpacity
          style={styles.desayuno}
          onPress={() => navigation.navigate("FiltroTienda", "desayuno")}
        >
          <Image
            style={styles.image}
            source={require("../assets/desayuno.png")}
          />
          <Text style={styles.textobr}>Desayuno </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.comidas}
          onPress={() => navigation.navigate("FiltroTienda", "comida")}
        >
          <Image
            style={styles.image}
            source={require("../assets/comidas.png")}
          />
          <Text style={styles.textobr}> Comidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saludable}
          onPress={() => navigation.navigate("FiltroTienda", "saludable")}
        >
          <Image
            style={styles.image}
            source={require("../assets/saludable.png")}
          />
          <Text style={styles.textobr}>Saludable</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bebidas}
          onPress={() => navigation.navigate("FiltroTienda", "bebidas")}
        >
          <Image
            style={styles.image}
            source={require("../assets/bebidas.png")}
          />
          <Text style={styles.textobr}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postres}
          onPress={() => navigation.navigate("FiltroTienda", "postres")}
        >
          <Image
            style={styles.image}
            source={require("../assets/postres.png")}
          />
          <Text style={styles.textobr}>Postres</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.snacks}
          onPress={() => navigation.navigate("FiltroTienda", "snacks")}
        >
          <Image
            style={styles.image}
            source={require("../assets/snacks.png")}
          />
          <Text style={styles.textobr}> Snacks</Text>
        </TouchableOpacity>

        <Text style={styles.titulo3}> Tiendas Populares </Text>
      </View>
      <FlatList
        style={styles.listaContainer}
        data={items}
        renderItem={({ item }) => <Tienda tienda={item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  containerS: {
    backgroundColor: "#c0d5e1",
  },

  imageProducto: {
    width: "100%",
    height: 125,
    borderRadius: 10,
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
    top: 140,
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
    top: 240,
    left: 30,
  },

  titulo3: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 480,
    left: 30,
  },

  textobr: {
    fontWeight: "600",
  },

  image: {
    width: 60,
    height: 60,
  },

  desayuno: {
    right: 120,
    top: 220,
  },

  comidas: {
    top: 140,
  },
  saludable: {
    top: 60,
    left: 120,
  },

  bebidas: {
    top: 80,
    right: 120,
  },

  postres: {
    top: 6,
    left: 6,
  },

  snacks: {
    bottom: 70,
    left: 120,
  },

  listaContainer: {
    width: "100%",

    backgroundColor: "#C0D5E1",
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: "95%",
    borderRadius: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
  },
  textoProductoContainer: {
    marginLeft: 15,
  },
  guardarBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5db385",
    marginTop: 20,
    width: "40%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
  },
  // container: {
  //     flex: 1,
  //     backgroundColor: '#1E6995',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
});

export default Home;
