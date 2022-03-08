import "../App.css"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
function EditList(props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [list, setList] = useState({
    list_name: "",
    list_completed: false,
  })

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

  const handleChange = (e) => {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:9000/api/lists/${id}`, list)
      .then((resp) => {
        props.editList(resp.data, id)
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
            <h1>Add List</h1>
          </div>
          <div className="add-list-body">
            <div className="form-group">
              <label>List Name: </label>
              <input
                value={list.list_name}
                onChange={handleChange}
                name="list_name"
                type="text"
                className="add-list-input"
              />
            </div>
          </div>
          <div className="add-list-footer">
            <button onClick={() => navigate("/")}>Cancel</button>
            <div style={{ width: "20px" }} />
            <input type="submit" className="btn btn-info" value="Save" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditList
