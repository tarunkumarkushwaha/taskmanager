import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Card, Checkbox, Button, Text, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteTodo, modTodo } from "../redux/todoSlice";
import { Picker } from "@react-native-picker/picker";

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

  // console.log(item)

  return (
    <Card
      style={{
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: item.check
          ? "#b3b3b3"
          : priority === "low"
            ? "#D6F6D5"
            : priority === "medium"
              ? "#ffe0cc"
              : "#ffb3b3",
      }}
    >
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Checkbox
            style={{
              backgroundColor: "red",
              borderWidth: 2,
              borderColor: "black",
              padding: 5,
            }}
            color="white"
            status={item.check ? "checked" : "unchecked"}
            onPress={() => dispatch(modTodo({ id: item.id, title, value: text, check: !item.check, priority }))}
          />

          <View style={{
            width: 150, borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: item.check
              ? "#b3b3b3"
              : priority === "low"
                ? "#D6F6D5"
                : priority === "medium"
                  ? "#ffe0cc"
                  : "#ffb3b3"
          }}>
            <Picker
              selectedValue={priority}
              onValueChange={handlePriorityChange}
              style={{ height: 50, borderWidth: 1, borderColor: "black", borderRadius: 10 }}
              mode="dropdown"
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          </View>
          <Button mode="contained" textColor="white" style={{ backgroundColor: "red" }} onPress={() => dispatch(deleteTodo({ id: item.id }))}>
            X
          </Button>
        </View>

        {isEditingTitle ? (
          <TextInput
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", borderBottomWidth: 1 }}
            value={title}
            onChangeText={setTitle}
            onBlur={handleTitleUpdate}
            onSubmitEditing={handleTitleUpdate}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
            <Text variant="titleMedium" style={{ fontSize: 25, textAlign: "center", color: "black", marginBlock: 10 }}>
              {title}
            </Text>
          </TouchableOpacity>
        )}

        {isEditing ? (
          <TextInput
            style={{ fontSize: 18, borderBottomWidth: 1, paddingVertical: 3, color: "black" }}
            value={text}
            onChangeText={setText}
            onBlur={handleUpdate}
            onSubmitEditing={handleUpdate}
            autoFocus
          // multiline
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text
              variant="bodyMedium"
              style={{ textDecorationLine: item.check ? "line-through" : "none", color: item.check ? "#888" : "black" }}
            >
              {text}
            </Text>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};


export default Todo;

