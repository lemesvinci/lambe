import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/user";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Gravatar } from "react-native-gravatar";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <Gravatar options={{ email, secure: true }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 100,
  },
  name: { 
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    marginTop: 10,
    fontSize: 20,
    color: "#555",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Profile;
