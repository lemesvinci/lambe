import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../store/actions/posts";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AddComment = ({ postId, name, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAddComment = () => {
    if (!comment.trim()) {
      setEditMode(false);
      return;
    }

    onAddComment({
      postId,
      comment: {
        nickname: name,
        comment,
      }
    });

    setComment("");
    setEditMode(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {editMode ? (
        <View style={styles.container}>
          <TextInput
            placeholder="Comente..."
            style={styles.input}
            autoFocus
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={handleAddComment}
          />
          <TouchableWithoutFeedback onPress={() => setEditMode(false)}>
            <Icon name="times" size={20} color="#555" style={styles.icon} />
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => setEditMode(true)}>
          <View style={styles.container}>
            <Icon name="comment-o" size={25} color="#555" />
            <Text style={styles.caption}>Comentar</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
  },
  caption: {
    marginLeft: 10,
    fontSize: 15,
    color: "#555",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    fontSize: 15,
    padding: 5,
  },
  icon: {
    marginLeft: 10,
  },
});

const mapStateToProps = ({ user }) => ({
  name: user.name,
});

const mapDispatchToProps = {
  onAddComment: addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);