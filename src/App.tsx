import React, { useState, useEffect } from "react";
import  Todo from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import UUID from "./utils/UUID";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      _id: "asd",
      name: "sacasc",
      description: "hhhhh",
      status: false

    }
  ]);




  useEffect(() => fetchTodos(), []);
  
  const fetchTodos = (): void => {
    let stringTodo = localStorage.getItem("map");
    let astr = JSON.parse(stringTodo || "[]");
    console.log(astr);
    let todoMap = new Map<string, ITodo>(astr);
    let todos: ITodo[] = [];
    todoMap.forEach((value, key)=>{
      console.log(value)
      todos.push(value);
    });

    
    setTodos(todos);
    };


  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    let stringTodo = localStorage.getItem("map");
    let astr = JSON.parse(stringTodo || "[]");
    let todoMap = new Map<string, ITodo>(astr);
    formData._id = UUID();
    console.log(formData._id)
    console.log(formData)
    todoMap.set(formData._id, formData);
    
    let mapString = JSON.stringify([...todoMap])
    localStorage.setItem("map", mapString);
    setTodos([
      ...todos,
      formData
    ]);
    
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    let stringTodo = localStorage.getItem("map");
    let astr = JSON.parse(stringTodo || "[]");
    let todoMap = new Map<string, ITodo>(astr);
    todo.status = true;
    todoMap.set(todo._id, todo);
    let mapString = JSON.stringify([...todoMap])
    localStorage.setItem("map", mapString);
    let todos: ITodo[] = [];
    todoMap.forEach((value, key)=>{
      todos.push(value);
    });
    setTodos(todos);
  };

  const handleDeleteTodo = (_id: string): void => {
    let stringTodo = localStorage.getItem("map");
    let astr = JSON.parse(stringTodo || "[]");
    let todoMap = new Map<string, ITodo>(astr);
    todoMap.delete(_id);
    let mapString = JSON.stringify([...todoMap])
    localStorage.setItem("map", mapString);
    let todos: ITodo[] = [];
    todoMap.forEach((value, key)=>{
      todos.push(value);
    });
    setTodos(todos);
  };

  return (
    <main className="App">
      <h1>memoire</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App