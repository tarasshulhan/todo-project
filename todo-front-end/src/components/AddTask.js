import "../App.css"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
function AddTask(props) {
  const navigate = useNavigate()
  const { listId } = useParams()
  const [task, setTask] = useState({
    task_description: "",
    task_completed: false,
    task_date: "",
    task_priority: "Low",
    list_id: parseInt(listId),
  })

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:9000/api/tasks/", task)
      .then((resp) => {
        props.addTask(resp)
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="add-list-container">
      <div className="add-list-form">
        <form onSubmit={handleSubmit}>
          <div className="add-list-header">
            <h1>Add Task</h1>
          </div>
          <div className="add-list-body">
            <div className="form-group">
              <label>Description: </label>
              <input
                value={task.task_description}
                onChange={handleChange}
                name="task_description"
                type="text"
                className="add-list-input"
              />
            </div>
            <div className="form-group">
              <label>Due Date: </label>
              <input
                type="date"
                name="task_date"
                onChange={handleChange}
                className="add-list-input"
              />
            </div>
            <div className="form-group">
              <label>Priority: </label>
              <select
                className="add-list-input"
                name="task_priority"
                onChange={(e) => handleChange(e)}
              >
                <option value="Low">Low</option>
                <option value="Med">Med</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="add-list-footer">
            <button onClick={() => navigate(-1)}>Cancel</button>
            <div style={{ width: "20px" }} />
            <input type="submit" className="btn btn-info" value="Add" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddTask
