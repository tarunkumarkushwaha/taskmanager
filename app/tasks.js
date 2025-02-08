import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { loadTodos, addTodo } from "../redux/todoSlice";
import Todo from "../components/Todo";
import { Picker } from "@react-native-picker/picker";


export default function Tasks() {
    const [priority, setPriority] = useState("medium");
    const [title, settitle] = useState("");
    const [item, setItem] = useState({ id: Date.now(), title: "", data: "", check: false, priority: "medium" });
    const [filterPriority, setFilterPriority] = useState("all");
    const [filterCompletion, setFilterCompletion] = useState("all");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.TODO);

    const pickerHandler = (value) => {
        setPriority(value);
    };

    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);

    const handleChange = (text) => {
        setItem((prev) => ({ ...prev, data: text }));
    };

    const handleAddTodo = () => {
        if (item.data.trim() !== "") {
            dispatch(addTodo({ ...item, id: Date.now(), priority, title }));
            setItem({ id: Date.now(), title, data: "", check: false, priority });
            settitle("")
            dispatch(loadTodos())
        }
    };
    // console.log(todos)


    const filteredTodos = todos.filter((task) => {
        const priorityMatch = filterPriority === "all" || task.priority === filterPriority;
        const completionMatch = filterCompletion === "all" || (filterCompletion === "completed" ? task.check : !task.check);
        return priorityMatch && completionMatch;
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>
                        <Text style={styles.completedText}>Completed:</Text> {todos.filter((t) => t.check).length}
                    </Text>
                    <Text style={styles.summaryText}>
                        <Text style={styles.uncompletedText}>Uncompleted:</Text> {todos.length - todos.filter((t) => t.check).length}
                    </Text>
                    <Text style={styles.summaryText}>
                        <Text style={styles.totalText}>Total:</Text> {todos.length}
                    </Text>
                </View>

                <View style={styles.todo}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={title}
                        onChangeText={(e) => settitle(e)}
                        placeholder="Title"
                        style={styles.input}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Priority</Text>
                    <Picker
                        selectedValue={priority}
                        onValueChange={pickerHandler}
                        style={styles.picker}
                    >
                        <Picker.Item label="low" value="low" />
                        <Picker.Item label="medium" value="medium" />
                        <Picker.Item label="high" value="high" />
                    </Picker>
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
                </View>


                <View style={styles.filtersContainer}>

                    <View style={styles.pickerContainerFilter}>
                        <Text style={styles.labelFilter}>Filter by Priority</Text>
                        <Picker selectedValue={filterPriority} onValueChange={setFilterPriority} style={styles.pickerFilter}>
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="Low" value="low" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="High" value="high" />
                        </Picker>
                    </View>

                    <View style={styles.pickerContainerFilter}>
                        <Text style={styles.labelFilter}>Filter by Completion</Text>
                        <Picker selectedValue={filterCompletion} onValueChange={setFilterCompletion} style={styles.pickerFilter}>
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="Completed" value="completed" />
                            <Picker.Item label="Uncompleted" value="uncompleted" />
                        </Picker>
                    </View>
                </View>

                <Text style={styles.hasTasksText}>Tasks</Text>

                <View style={styles.taskContainer}>
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((task, index) => <Todo key={task.id} item={task} id={index} />)
                    ) : (
                        <Text style={styles.noTasksText}>No tasks available.</Text>
                    )}
                </View>


                {/* <View style={styles.taskContainer}>
                    {todos.length > 0 ? (
                        todos.map((task, index) => <Todo key={task.id} item={task} id={index} />)
                    ) : (
                        <Text style={styles.noTasksText}>No tasks available.</Text>
                    )}
                </View> */}

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
    todo: {
        flex:1,
        alignItems:"center",
        backgroundColor: "#ffff99",
        padding: 10,
        width:"95%",
        borderColor: "#808080",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
        marginTop: 20,
        // paddingBlock:8,
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
        paddingBlock: 12,
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
    hasTasksText: {
        textAlign: "center",
        color: "#1E88E5",
        fontSize: 20,
    },
    pickerContainer: {
        marginVertical: 2,
        width: "95%",
    },
    label: {
        color: '#1E88E5',
        marginBottom: 5,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: "100%",
        color: "#333",
        backgroundColor: "#FFF",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    filtersContainer: {
        backgroundColor: "#ffb3ff",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '95%',
        marginBlock: 20,
        borderColor: "#808080",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    pickerContainerFilter: {
        flex: 1,
        marginHorizontal: 5,
    },
    labelFilter: {
        color: '#1E88E5',
        marginBottom: 5,
        textAlign: 'center',
    },
    pickerFilter: {
        height: 50,
        width: '100%',
        color: '#333',
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});