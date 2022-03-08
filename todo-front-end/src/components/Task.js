import "../App.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
function Task(props) {
  const {
    list_id,
    task_id,
    task_description,
    task_completed,
    task_date,
    task_priority,
  } = props

  let task = {
    list_id,
    task_description,
    task_completed,
    task_date,
    task_priority,
  }
  const handleMarkComplete = (e) => {
    const taskCompleted = { ...task, task_completed: true }
    axios
      .put(`http://localhost:9000/api/tasks/${task_id}`, taskCompleted)
      .then((resp) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleMarkIncomplete = (e) => {
    const taskNotCompleted = { ...task, task_completed: false }
    axios
      .put(`http://localhost:9000/api/tasks/${task_id}`, taskNotCompleted)
      .then((resp) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:9000/api/tasks/${task_id}`)
      .then((resp) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="task-container">
      <div className={`task${task_completed ? " completed" : ""}`}>
        <p>{task_description} </p>
        <p>{task_date} </p>
        <p>{task_priority} </p>
      </div>
      <div className="task-buttons">
        {task_completed === false ? (
          <button onClick={() => handleMarkComplete()}>Mark Complete</button>
        ) : (
          <button onClick={() => handleMarkIncomplete()}>
            Mark Incomplete
          </button>
        )}

        <Link to={`/tasks/edit/${task_id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  )
}

export default Task
