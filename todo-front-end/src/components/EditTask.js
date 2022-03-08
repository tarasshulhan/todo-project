import "../App.css"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
function EditTask(props) {
  const navigate = useNavigate()
  const [initial_priotity, setInintialPriority] = useState("")
  const { id } = useParams()
  const [task, setTask] = useState({
    task_description: "",
    task_completed: false,
    task_date: "",
    task_priority: "Low",
    list_id: "",
  })

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data)
        setInintialPriority(res.data.task_priority)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:9000/api/tasks/${id}`, task)
      .then((resp) => {
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
            <h1>Edit Task</h1>
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
              <p>Current: {initial_priotity}</p>
              <select
                defaultValue={task.task_priority}
                name="task_priority"
                onChange={(e) => handleChange(e)}
                className="add-list-input"
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
            <input type="submit" className="btn" value="Save" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditTask
