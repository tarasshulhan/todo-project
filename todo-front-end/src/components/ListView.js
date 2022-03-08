import "../App.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
function ListView(props) {
  const { list_id, list_name, counts_tasks, counts_completed } = props
  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:9000/api/lists/${list_id}`)
      .then((resp) => {
        console.log(resp.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  let list_completed = false
  if (counts_tasks !== 0 && counts_completed === counts_tasks) {
    list_completed = true
  }
  return (
    <div className="list-view">
      <Link to={`/lists/${list_id}`}>
        <div className={`list-link${list_completed ? " completed" : ""}`}>
          <p className="list-title">{list_name}</p>
          <div style={{ width: "100px" }} />
          <p className="list-title">
            Completed: ({counts_completed}/{counts_tasks})
          </p>
        </div>
      </Link>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "20px" }} />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ListView
