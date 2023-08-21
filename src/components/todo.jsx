import { useDispatch, useSelector } from "react-redux"
import { addTodo, removeTodo, updateTodo } from "../redux/todoSlice"
import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'

const Todo = () => {
    const todos = useSelector(state => state.Todo.todos)
    const dispatch = useDispatch()
    const [todo, setTodo] = useState('');
    const [updateTodoFiled, setUpdateTodoField] = useState({ id: 0, todo: '' })
    const [edit, setEdit] = useState({ id: null, open: false })
    const handleAddTodo = () => {
        if (todo !== '') {
            dispatch(addTodo(todo))
        }
        setTodo("");
    }
    const editTodo = (todo, index) => {
        setUpdateTodoField({ id: index, todo: todo })
        setEdit({ id: index, open: true })
    }
    const updateTodoFun = () => {
        if (updateTodoFiled.todo !== '') {
            setEdit(false)
            dispatch(updateTodo(updateTodoFiled))
        }
    }
    const deleteTodo = (text) => {
        dispatch(removeTodo(text))
    }
    return (
        <div style={{ textAlign: 'center', margin: '5rem auto', width: '56.25rem' }}>
            <h1>Todo App</h1>
            <input type="text" placeholder="Add to do item..." value={todo} className="inputStyle"
                onChange={(e) => setTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} />
            <button style={{ height: '2rem',border:'none' }} onClick={handleAddTodo}>Add to do</button>
            <h3>Todo list</h3>
            <AnimatePresence>
                {todos?.map((todo, index) => (<div key={index}>
                    <motion.div drag dragConstraints={{ top: 0, bottom: 0, left: 150, right: -180 }} >
                        <motion.div animate={{ x: '17rem' }} initial={true} transition={{ ease: "easeOut" }} exit={{ x: '100rem' }} style={{ background: 'black', color: '#fff', width: '20rem', height: '3rem', margin: '1rem' }}>
                            <div style={{ borderLeft: '5px solid orange', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0.5rem' }}>
                                <li style={{ listStyle: 'none' }}>{index + 1}:{todo}</li>
                                <div>
                                    <button className="edit" onClick={() => editTodo(todo, index)}>Edit</button>
                                    <button className="delete" onClick={() => deleteTodo(todo)}>Delete</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <AnimatePresence>
                        {edit.id === index && edit.open && <>
                            <motion.div exit={{ scale: 0 }}>
                                <motion.input animate={{ scale: 1.1 }} type="text" placeholder="Update" className="updateInputStyle" value={updateTodoFiled.todo} onKeyPress={(e) => e.key === 'Enter' && updateTodoFun()} onChange={(e) => setUpdateTodoField({ id: index, todo: e.target.value })} />
                                <motion.button animate={{ scale: 1.1 }} className="updateButtonStyle" onClick={updateTodoFun} >Update</motion.button>
                            </motion.div>
                        </>}
                    </AnimatePresence>
                </div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Todo