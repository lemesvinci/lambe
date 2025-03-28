import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Author from "./Author";
import Comments from "./Comments";
import AddComment from "./AddComments";

// Mapeamento de nomes de arquivos para assets locais
const localImages = {
  "fence.jpg": require("../../assets/imgs/fence.jpg"),
  "bw.jpg": require("../../assets/imgs/bw.jpg"),
};

const Post = ({ image, email, nickname, comments, id }) => {
  const name = useSelector((state) => state.user.name);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 3) / 4,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = Dimensions.get("window").width;
      setDimensions({
        width,
        height: (width * 3) / 4,
      });
    };

    const subscription = Dimensions.addEventListener("change", updateDimensions);
    updateDimensions();

    return () => {
      subscription?.remove();
    };
  }, []);

  // Determina a source da imagem
  let imageSource = null;
  if (image) {
    if (typeof image === "string") {
      if (localImages[image]) {
        imageSource = localImages[image];
      } else {
        imageSource = { uri: image };
      }
    } else if (typeof image === "object") {
      if (image.uri) {
        imageSource = { uri: image.uri };
      } else if (image.base64) {
        imageSource = { uri: `data:image/jpeg;base64,${image.base64}` };
      }
    }
  }

  return (
    <View style={styles.container}>
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.image, { width: dimensions.width, height: dimensions.height }]}
        />
      )}
      <Author email={email} nickname={nickname} />
      <Comments comments={comments} />
      {name && <AddComment postId={id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  image: {
    resizeMode: "contain",
  },
});

Post.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      uri: PropTypes.string,
      base64: PropTypes.string,
    }),
  ]),
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Post;