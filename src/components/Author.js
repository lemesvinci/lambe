import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Gravatar } from "react-native-gravatar";

const Author = ({ email, nickname }) => {
  return (
    <View style={styles.container}>
      <Gravatar options=
        {{
          email: email,
          secure: true,
        }}
        style={styles.avatar}        
      />
      <Text style={styles.nickname}>{nickname}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    nickname: {
        color: "#444",
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Author;
