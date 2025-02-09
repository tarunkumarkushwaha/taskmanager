import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, SafeAreaView, Alert } from "react-native";
import { loadTodos, addTodo } from "../redux/todoSlice";
import Todo from "../components/Todo";
import { Picker } from "@react-native-picker/picker";
import { Text, TextInput, Button, Card } from 'react-native-paper';
import DatePicker from "../components/DatePicker";
import moment from "moment";


export default function Tasks() {
    const [date, setDate] = useState(Date.now());
    const [dateModal, setdateModal] = useState(false);
    const [priority, setPriority] = useState("medium");
    const [title, settitle] = useState("");
    const [item, setItem] = useState({ id: Date.now(), title: "", data: "", check: false, priority: "medium", due: date });
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
        if (item.data.trim() !== "" || item.title.trim() !== "") {
            dispatch(addTodo({ ...item, id: Date.now(), priority, title, date }));
            setItem({ id: Date.now(), title, data: "", check: false, priority, due: date });
            settitle("")
            dispatch(loadTodos())
        } else {Alert.alert("Error", "Enter title or description"); }
    };

    const dateChange = (data) => {
        setDate(data)
    }
    // console.log(todos)


    const filteredTodos = todos.filter((task) => {
        const priorityMatch = filterPriority === "all" || task.priority === filterPriority;
        const completionMatch = filterCompletion === "all" || (filterCompletion === "completed" ? task.check : !task.check);
        return priorityMatch && completionMatch;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E3F2FD', padding: 5 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 80 }}>
                <Card style={{ width: '95%', margin: 15, padding: 18, flex: 1, flexDirection: "row", backgroundColor: "#cccccc", }}>
                    <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, }}>
                        <Text variant="titleMedium" style={{ color: '#43A047' }}>Completed: {todos.filter((t) => t.check).length}</Text>
                        <Text variant="titleMedium" style={{ color: '#F57C00' }}>Uncompleted: {todos.length - todos.filter((t) => t.check).length}</Text>
                        <Text variant="titleMedium" style={{ color: '#1E88E5' }}>Total: {todos.length}</Text>
                    </Card.Content>
                </Card>

                <Card style={{ width: '95%', padding: 5 }}>
                    <Card.Content>
                        <TextInput label="Title" style={{ marginBlock: 15, borderRadius: 10 }} value={title} onChangeText={settitle} />
                        <Text variant="titleSmall" >Priority</Text>
                        <Picker style={{ marginBlock: 15, height: 50, backgroundColor: "grey", borderRadius: 10 }} selectedValue={priority} onValueChange={pickerHandler}>
                            <Picker.Item label="Low" value="low" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="High" value="high" />
                        </Picker>
                        <Text >Due date: {moment(date).format("YYYY-MM-DD")}</Text>
                        <Button mode="contained" textColor="white" onPress={() => setdateModal(!dateModal)} style={{ marginTop: 10, borderRadius: 10, backgroundColor: "#1f004d" }}>Select Date</Button>
                        <DatePicker visible={dateModal} onClose={() => setdateModal(!dateModal)} date={date} onSelectDate={dateChange} />
                        <TextInput label="Enter your task..." style={{ marginBlock: 15, borderRadius: 10 }} value={item.data} onChangeText={handleChange} />
                        <Button mode="contained" textColor="white" onPress={handleAddTodo} style={{ marginTop: 10, borderRadius: 10, backgroundColor: "#1f004d" }}>Add</Button>
                    </Card.Content>
                </Card>

                <Card style={{ width: '95%', padding: 10, marginTop: 20 }}>
                    <Card.Content>
                        <Text variant="titleSmall">Filter by Priority</Text>
                        <Picker selectedValue={filterPriority} onValueChange={setFilterPriority} style={{ height: 50, backgroundColor: "grey", borderRadius: 10 }}>
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="Low" value="low" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="High" value="high" />
                        </Picker>
                    </Card.Content>
                    <Card.Content>
                        <Text variant="titleSmall">Filter by Completion</Text>
                        <Picker selectedValue={filterCompletion} onValueChange={setFilterCompletion} style={{ height: 50, backgroundColor: "grey", borderRadius: 10 }}>
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="completed" value="completed" />
                            <Picker.Item label="uncompleted" value="uncompleted" />
                        </Picker>
                    </Card.Content>
                </Card>

                <Text variant="titleLarge" style={{ textAlign: 'center', color: '#1E88E5', marginTop: 20 }}>Tasks</Text>

                <View style={{ width: '95%', marginTop: 20 }}>
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((task, index) => <Todo key={task.id} item={task} id={index} />)
                    ) : (
                        <Text style={{ textAlign: 'center', color: '#777', fontSize: 16, marginTop: 20 }}>No tasks available.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#E3F2FD",
//         padding: 15,
//     },
//     scrollContainer: {
//         alignItems: "center",
//         paddingBottom: 80,
//     },
//     summaryBox: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "#fff",
//         padding: 18,
//         borderRadius: 15,
//         shadowColor: "#000",
//         shadowOpacity: 0.15,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//         width: "95%",
//         margin: 15,
//     },
//     summaryText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     completedText: { color: "#43A047" },
//     uncompletedText: { color: "#F57C00" },
//     totalText: { color: "#1E88E5" },
//     todo: {
//         flex:1,
//         alignItems:"center",
//         backgroundColor: "#ffff99",
//         padding: 10,
//         width:"95%",
//         borderColor: "#808080",
//         borderWidth: 1,
//         borderRadius: 10,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//     },
//     inputContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: "95%",
//         marginTop: 20,
//         // paddingBlock:8,
//         backgroundColor: "#FFF",
//         borderRadius: 12,
//         paddingHorizontal: 1,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         elevation: 3,
//     },
//     input: {
//         flex: 1,
//         backgroundColor: "#FFF",
//         padding: 12,
//         paddingBlock: 12,
//         borderRadius: 8,
//         fontSize: 16,
//         color: "#333",
//         borderColor: "#FFF",
//         paddingVertical: 3,
//         borderWidth: 0,
//         outlineStyle: "none",
//     },
//     addButton: {
//         backgroundColor: "#00796B",
//         paddingVertical: 12,
//         paddingHorizontal: 22,
//         borderRadius: 10,
//         marginLeft: 10,
//     },
//     addButtonText: {
//         color: "#FFF",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     taskContainer: {
//         width: "95%",
//         marginTop: 20,
//     },
//     noTasksText: {
//         textAlign: "center",
//         color: "#777",
//         fontSize: 16,
//         marginTop: 20,
//     },
//     hasTasksText: {
//         textAlign: "center",
//         color: "#1E88E5",
//         fontSize: 20,
//     },
//     pickerContainer: {
//         marginVertical: 2,
//         width: "95%",
//     },
//     label: {
//         color: '#1E88E5',
//         marginBottom: 5,
//         textAlign: 'center',
//     },
//     picker: {
//         height: 50,
//         width: "100%",
//         color: "#333",
//         backgroundColor: "#FFF",
//         borderRadius: 5,
//         paddingHorizontal: 10,
//     },
//     filtersContainer: {
//         backgroundColor: "#ffb3ff",
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         width: '95%',
//         marginBlock: 20,
//         borderColor: "#808080",
//         borderWidth: 1,
//         borderRadius: 10,
//         padding: 10,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//     },
//     pickerContainerFilter: {
//         flex: 1,
//         marginHorizontal: 5,
//     },
//     labelFilter: {
//         color: '#1E88E5',
//         marginBottom: 5,
//         textAlign: 'center',
//     },
//     pickerFilter: {
//         height: 50,
//         width: '100%',
//         color: '#333',
//         backgroundColor: '#FFF',
//         borderRadius: 5,
//         paddingHorizontal: 10,
//     },
// });