import "./App.css"
import React, { useEffect, useState } from "react"
import { Link, Route, Routes, BrowserRouter } from "react-router-dom"
import axios from "axios"
import ListView from "./components/ListView"
import List from "./components/List"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import AddList from "./components/AddList"
function App() {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])

  //add new list to state
  const addList = (list) => {
    const tempLists = [...lists, list]
    setLists(tempLists)
  }

  const addTask = (task) => {
    const tempTasks = [...tasks, task]
    setTasks(tempTasks)
  }

  //get todo lists
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/lists/")
      .then((res) => {
        setLists(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //get all tasks
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/tasks/")
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // count tasks and completed task per list
  const counts = {}
  for (let i of lists) {
    let tasks_count = 0
    let completed_count = 0
    for (let x of tasks) {
      if (x.list_id === i.list_id) {
        tasks_count += 1
        if (x.task_completed) {
          completed_count += 1
        }
      }
    }
    counts[i.list_name] = { tasks: tasks_count, completed: completed_count }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="lists-outer-container">
              <div className="lists-container">
                <h1>To-Do Lists</h1>
                {lists.map((list) => {
                  return (
                    <ListView
                      key={list.list_id}
                      list_id={list.list_id}
                      list_name={list.list_name}
                      counts_tasks={counts[list.list_name].tasks}
                      counts_completed={counts[list.list_name].completed}
                    />
                  )
                })}
                <Link to="/lists/add">
                  <button className="add-list-btn">Add List</button>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/lists/:id" element={<List />} />
        <Route path="/lists/add" element={<AddList addList={addList} />} />
        <Route
          path="/tasks/add/:listId"
          element={<AddTask addTask={addTask} />}
        />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
