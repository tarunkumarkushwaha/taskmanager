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
      const todoIdToDelete = action.payload.id;
      const index = state.findIndex(todo => todo.id === todoIdToDelete);

      if (index !== -1) {
        state.splice(index, 1);
        AsyncStorage.setItem('items', JSON.stringify(state));
      } else {
        console.warn("Todo item not found for deletion:", todoIdToDelete);
      }
    },
    deleteAll: (state) => {
      AsyncStorage.removeItem('items');
      return [];
    },
    modTodo: (state, action) => {
      const item = {
        id: action.payload.id,
        title: action.payload.title,
        data: action.payload.value,
        check: action.payload.check,
        priority: action.payload.priority,
        due: action.payload.due,
      };
      const todoIdToMod = action.payload.id;
      const index = state.findIndex(todo => todo.id === todoIdToMod);

      if (index !== -1) {
        state.splice(index, 1, item);
        AsyncStorage.setItem('items', JSON.stringify(state));
      } else {
        console.warn("Todo item not found for deletion:", todoIdToDelete);
      }
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