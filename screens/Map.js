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
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext, ContexProvider } from "../UserContext";

import MapView, { Marker } from 'react-native-maps';

const Stack = createStackNavigator();

const Map = ({ route }) => {


    const navigation = useNavigation();

    const [marker, setMarker] = useState({
        coordinate: {
            latitude: route.params.tienda.lat,
            longitude: route.params.tienda.lng
        }
    });


    return (
        <View style={styles.container}>
            <MapView style={styles.mapa}
                initialRegion={{
                    latitude: 29.083164243291787,
                    longitude: -110.962082842638,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.0090,
                }}
            >
                <Marker
                    coordinate={marker.coordinate}
                />
            </MapView>


        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C0D5E1",
        alignItems: "center",
        justifyContent: "center",
    },
    mapa: {
        width: '95%',
        height: '80%',
        borderRadius: 25
    },
    editinfo: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6dcf9b",
        marginTop: 20,
        width: "50%",
        marginLeft: 15,
    },
    edtext: {
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default Map;
