import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteTodo, modTodo } from "../redux/todoSlice";

const Todo = ({ item, id }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.data);
  const [priority, setPriority] = useState(item.priority);

  const handleUpdate = () => {
    dispatch(modTodo({ id: item.id, title, value: text, check: item.check, priority }));
    setIsEditing(false);
  };

  const handleTitleUpdate = () => {
    dispatch(modTodo({ id: item.id, title, value: text, check: item.check, priority }));
    setIsEditingTitle(false);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    dispatch(modTodo({ id: item.id, title, value: text, check: item.check, priority: newPriority }));
  };

  return (
    <View style={[styles.container,
    item.check ? styles.containercheck : item.priority == "low" ? {
      backgroundColor: "#D6F6D5"
    } : item.priority == "medium" ? {
      backgroundColor: "#ffe0cc"
    } : item.priority == "high" ? {
      backgroundColor: "#ffb3b3"
    } : styles.containercheck
    ]}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={[styles.checkbox, item.check && styles.checked]}
          onPress={() => dispatch(modTodo({ id: item.id, title, value: text, check: !item.check, priority }))}
        />
        <View style={styles.priorityContainer}>
          <Text style={styles.priorityLabel}>Priority:</Text>
          <Picker
            selectedValue={priority}
            style={styles.picker}
            onValueChange={handlePriorityChange}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => { dispatch(deleteTodo({ id: item.id })); }}
        >
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        {isEditingTitle ? (
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            onBlur={handleTitleUpdate}
            onSubmitEditing={handleTitleUpdate}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}

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
            <Text style={[styles.text, item.check && styles.completedText]}>
              <Text style={styles.index}>{id + 1}.</Text> {text}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  containercheck: {
    backgroundColor: "#b3b3b3"
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#43A047",
    borderRadius: 6,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#43A047",
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  priorityLabel: {
    fontSize: 14,
    color: "#555",
    marginRight: 5,
  },
  picker: {
    height: 50,
    // width: "100%",
    color: "#333",
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 3,
    borderWidth: 0,
    outlineStyle: "none",
    width: "80%",
    paddingLeft: 40
  },
  titleInput: {
    fontSize: 18,
    borderWidth: 0,
    outlineStyle: "none",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
    flexShrink: 1,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 15,
    backgroundColor: "#b30000",
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  index: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
    marginRight: 12,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
    margin: 5,
  },
});

export default Todo;

