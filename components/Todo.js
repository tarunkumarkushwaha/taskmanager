import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Card, Checkbox, Button, Text, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteTodo, modTodo } from "../redux/todoSlice";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

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

        <Text style={{ fontSize: 15, textAlign: "center", margin: 10 }}>

          Due date: {moment(item.due).format("YYYY-MM-DD")}</Text>

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
              <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}>{id + 1}. </Text>
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
            <Card style={{ margin: 8, padding: 12, backgroundColor: "#f5f5f5", borderRadius: 10, elevation: 3 }}>
              <Text
                variant="bodyMedium"
                style={{
                  textDecorationLine: item.check ? "line-through" : "none",
                  color: item.check ? "#888" : "black",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                <Text style={{ color: "#888" }}>desc: </Text>{text}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};


export default Todo;

