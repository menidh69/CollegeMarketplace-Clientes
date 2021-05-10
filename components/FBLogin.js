import React from "react";
import * as Facebook from "expo-facebook";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FBLogin = (props) => {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: "1139911739856329",
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
        error,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const fbdata = await response.json();
        console.log(fbdata);
        props.fbLoginFunction(fbdata);
        return;
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch (e) {
      console.log(e);
      alert(`Facebook Login Error: ${e.message}`);
    }
  }
  return (
    <TouchableOpacity onPress={logIn} style={styles.fbBtn}>
      <Text style={styles.loginText}>Conectarse con Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginText: {
    color: "white",
  },
  fbView: {
    backgroundColor: "#4267B2",
    borderRadius: 30,
    width: "80%",
    height: 50,
    marginBottom: 20,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fbBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  fbIconoStyle: {
    width: 25,
    height: 25,
  },
});

export default FBLogin;
