import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../store/actions/posts";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const noUser = "você precisa estar logado para adicionar fotos";

class AddPhoto extends Component {
  state = {
    image: null,
    comment: "",
  };

  pickImage = async () => {
    if (!this.props.name) {
      Alert.alert("falha!", noUser);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada!",
        "É necessário liberar o acesso à galeria."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ image: { uri: result.assets[0].uri } });
    }
  };

  save = async () => {
    if (!this.props.name) {
      Alert.alert("falha!", noUser);
      return;
    }

    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment,
        },
      ],
    });

    this.setState({
      image: null,
      comment: "",
    });
    this.props.navigation.navigate("Feed");
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>escolha uma foto</Text>

        <View style={styles.imageContainer}>
          {this.state.image ? (
            <Image source={this.state.image} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>
              nenhuma imagem selecionada
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={this.pickImage} style={styles.button}>
          <Text style={styles.buttonText}>adicione uma foto</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="algum comentário para a foto?"
          style={styles.input}
          value={this.state.comment}
          editable={!!this.state.image}
          onChangeText={(comment) => this.setState({ comment })}
        />

        <TouchableOpacity onPress={this.save} style={styles.button}>
          <Text style={styles.buttonText}>salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imageContainer: {
    width: "90%",
    height: (Dimensions.get("window").width * 3) / 4,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: "#888",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

// export default AddPhoto;

const mapStateToProps = ({ user }) => {
  return {
    name: user.name,
    email: user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);