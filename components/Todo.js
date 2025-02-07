import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { deleteTodo, modTodo } from "../redux/todoSlice";

const Todo = ({ item, i }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.data);

  const handleUpdate = () => {
    dispatch(modTodo({ id: i, value: text, check: item.completed }));
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checked]}
        onPress={() =>
          dispatch(modTodo({ id: i, value: text, check: !item.completed }))
        }
      />
      <Text style={styles.index}>{i + 1}.</Text>
      <View style={styles.textcontainer}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onBlur={handleUpdate}
          onSubmitEditing={handleUpdate}
          autoFocus
          multiline
        />
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={[styles.text, item.completed && styles.completedText]}>
            {text}
          </Text>
        </TouchableOpacity>
      )}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(deleteTodo(item._id))}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start", 
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexWrap: "wrap", 
  },
  textcontainer: {
    flex: 1, 
    flexDirection: "column",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#43A047",
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#43A047",
    borderColor: "#43A047",
  },
  index: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
    marginRight: 12,
  },
  input: {
    flex: 1, 
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "#FFF",
    paddingVertical: 3,
    borderWidth: 0,
    outlineStyle: "none",
  },
  text: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
    flexShrink: 1,
  },
  deleteButton: {
    position: "absolute",
    right: 5,
    top: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#FF5252",
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export default Todo;
