import React, { useState, useEffect } from "react";
import { Gravatar } from "react-native-gravatar";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import icon from "../../assets/imgs/icon.png";
import { connect } from "react-redux";

function Header({ name = "anônimo", email }) {
  const [fontsLoaded] = useFonts({
    shelter: require("../../assets/fonts/shelter.otf"),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!appReady) return null;

  const gravatar = email ? (
    <Gravatar options={{ email, secure: true }} style={styles.avatar} />
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>Lambe Lambe</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.user}>{name}</Text>
        {gravatar}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#BBB",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    color: "#000",
    fontFamily: "shelter",
    fontSize: 28,
    height: 30,
  },
  user: {
    fontSize: 16,
    marginRight: 10,
    color: "#888",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    email: state.user?.email,
    name: state.user?.name || "anônimo",
  };
};

export default connect(mapStateToProps)(Header);
