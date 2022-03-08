import "../App.css"
import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Task from "./Task"
import axios from "axios"
function List(props) {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [tasks, setTasks] = useState([])
  const { id } = useParams()
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/lists/${id}`)
      .then((res) => {
        setList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/tasks/list/${id}`)
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={`list${list.list_completed ? " completed" : ""}`}>
      <h2>{list.list_name}</h2>
      <div className="task-key">
        <p>Description </p>
        <p>Date </p>
        <p>Priority </p>
      </div>
      {tasks.map((task) => {
        return (
          <Task
            list_id={id}
            key={task.task_id}
            task_id={task.task_id}
            task_date={task.task_date}
            task_priority={task.task_priority}
            task_completed={task.task_completed}
            task_description={task.task_description}
          />
        )
      })}
      <div className="list-buttons">
        {/* <Link to="/"> */}
        <button onClick={() => navigate(-1)}>Back</button>
        {/* </Link> */}

        <div style={{ width: "20px" }} />

        <Link to={`/tasks/add/${id}`}>
          <button>Add Task</button>
        </Link>
      </div>
    </div>
  )
}
export default List
