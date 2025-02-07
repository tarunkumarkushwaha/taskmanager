"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { loadTodos, addTodo } from "../redux/todoSlice";
import Todo from "../components/Todo";


export default function Home() {
  const [item, setItem] = useState({ data: "", completed: false });
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.TODO);

  // console.log(todos)

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleChange = (text) => {
    setItem({ data: text, completed: false });
  };

  const handleAddTodo = () => {
    if (item.data.trim() !== "") {
      dispatch(addTodo(item));
      setItem({ data: "", completed: false });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            <Text style={styles.completedText}>Completed:</Text> {todos.filter((t) => t.completed).length}
          </Text>
          <Text style={styles.summaryText}>
            <Text style={styles.uncompletedText}>Uncompleted:</Text> {todos.length - todos.filter((t) => t.completed).length}
          </Text>
          <Text style={styles.summaryText}>
            <Text style={styles.totalText}>Total:</Text> {todos.length}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={item.data}
            onChangeText={handleChange}
            placeholder="Enter your task..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskContainer}>
          {todos.length > 0 ? (
            todos.map((task, index) => <Todo key={index} item={task} i={index} />)
          ) : (
            <Text style={styles.noTasksText}>No tasks available.</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 15,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 80,
  },
  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: "95%",
    margin: 15,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  completedText: { color: "#43A047" },
  uncompletedText: { color: "#F57C00" },
  totalText: { color: "#1E88E5" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    borderColor: "#FFF",
    paddingVertical: 3,
    borderWidth: 0,
    outlineStyle: "none",
  },
  addButton: {
    backgroundColor: "#00796B",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskContainer: {
    width: "95%",
    marginTop: 20,
  },
  noTasksText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 20,
  },
});

