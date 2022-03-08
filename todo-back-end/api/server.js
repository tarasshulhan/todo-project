const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const listRouter = require("./list/router")
const taskRouter = require("./task/router")
const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use("/api/lists", listRouter)
server.use("/api/tasks", taskRouter)

server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found" })
})

server.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = server
