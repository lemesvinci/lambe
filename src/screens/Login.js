import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../store/actions/user";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Login = ({ navigation, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Efeito que atualiza o nome para "Temporário" quando email ou senha são preenchidos
  useEffect(() => {
    if ((email || password) && !name) {
      setName("temporário");
    }
  }, [email, password, name]);

  const handleLogin = () => {
    if (!name || !email || !password) {
      alert("preencha todos os campos!");
      return;
    }

    onLogin({ name, email, password });
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="e-mail"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  input: {
    width: "90%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#007bff",
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch(login(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);