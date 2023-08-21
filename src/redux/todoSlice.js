import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name:'Todo',
    initialState:{
        todos:[],
    },
    reducers:{
        addTodo:(state,action)=>{
        state.todos.push(action.payload)
        },
        updateTodo:(state,action)=>{
         const foundIndex = state.todos.findIndex((todos,index)=>action.payload.id === index)
         state.todos[foundIndex] = action.payload.todo  
        },
        removeTodo:(state,action)=>{
        const removedTodos = state.todos.filter((todo)=>todo!==action.payload);
        state.todos = [...removedTodos]
        }
    },
})

export const {addTodo,updateTodo,removeTodo} = todoSlice.actions
export default todoSlice.reducer;