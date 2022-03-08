const db = require("../../data/dbConfig")

function get() {
  return db("lists")
}

const getById = (id) => {
  return db("lists").where("list_id", id).first()
}

async function create(list) {
  const id = await db("lists").insert(list)
  return getById(id)
}

async function update(id, list) {
  await db("lists").update(list).where("list_id", id)
  return getById(id)
}

function remove(id) {
  return db("lists").where("list_id", id).del()
}

module.exports = { get, getById, create, update, remove }
