const db = require("../../data/dbConfig")

function get() {
  return db.select("*").from("tasks")
  // .leftJoin("lists", "tasks.list_id", "lists.list_id")
}

const getById = (id) => {
  return db("tasks").where("task_id", id).first()
}

const getByList = (id) => {
  return db("tasks").where("list_id", id)
}

async function create(task) {
  const id = await db("tasks").insert(task)
  return getById(id)
}

async function update(id, task) {
  await db("tasks").update(task).where("task_id", id)
  return getById(id)
}

function remove(id) {
  return db("tasks").where("task_id", id).del()
}

module.exports = { get, getById, getByList, create, update, remove }
