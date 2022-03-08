const router = require("express").Router()
const Tasks = require("./model")
const { validateTask, validateTaskId } = require("./middleware")
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Tasks.get()
    const newTasks = tasks.map((task) => {
      if (task.task_completed === 0) {
        return { ...task, task_completed: false }
      } else {
        return { ...task, task_completed: true }
      }
    })
    res.status(200).json(newTasks)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    let task = await Tasks.getById(req.params.id)
    if (task.task_completed === 0) {
      task = { ...task, task_completed: false }
    } else {
      task = { ...task, task_completed: true }
    }
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
})

router.get("/list/:id", async (req, res, next) => {
  try {
    const tasks = await Tasks.getByList(req.params.id)
    const newTasks = tasks.map((task) => {
      if (task.task_completed === 0) {
        return { ...task, task_completed: false }
      } else {
        return { ...task, task_completed: true }
      }
    })
    res.status(200).json(newTasks)
  } catch (err) {
    next(err)
  }
})

router.post("/", validateTask, (req, res, next) => {
  if (req.body.task_completed === true) {
    req.body = { ...req.body, task_completed: 1 }
  } else if (req.body.task_completed === false) {
    req.body = { ...req.body, task_completed: 0 }
  }
  Tasks.create(req.body)
    .then((task) => {
      if (task.task_completed === 0) {
        res.status(200).json({ ...task, task_completed: false })
      } else {
        res.status(200).json({ ...task, task_completed: true })
      }
    })
    .catch(next)
})

router.put("/:id", validateTaskId, validateTask, (req, res, next) => {
  if (req.body.task_completed === true) {
    req.body = { ...req.body, task_completed: 1 }
  } else if (req.body.task_completed === false) {
    req.body = { ...req.body, task_completed: 0 }
  }
  Tasks.update(req.params.id, req.body)
    .then((task) => {
      if (task.task_completed === 0) {
        res.status(200).json({ ...task, task_completed: false })
      } else {
        res.status(200).json({ ...task, task_completed: true })
      }
    })
    .catch(next)
})

router.delete("/:id", validateTaskId, (req, res, next) => {
  Tasks.remove(req.params.id)
    .then(res.status(200).json(`item deleted successfully`))
    .catch(next)
})

module.exports = router
