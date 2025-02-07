import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTodos = createAsyncThunk('todo/loadTodos', async () => {
  const items = await AsyncStorage.getItem('items');
  return items ? JSON.parse(items) : [];
  
});

// console.log("on")

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      AsyncStorage.setItem('items', JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      state.splice(action.payload, 1);
      AsyncStorage.setItem('items', JSON.stringify(state));
    },
    deleteAll: (state) => {
      AsyncStorage.removeItem('items');
      return [];
    },
    modTodo: (state, action) => {
      const item = {
        data: action.payload.value,
        completed: action.payload.check,
      };
      state.splice(action.payload.id, 1, item);
      AsyncStorage.setItem('items', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTodo, deleteTodo, deleteAll, modTodo } = todoSlice.actions;

// let todoreducer = todoSlice.reducer
export default todoSlice.reducer;