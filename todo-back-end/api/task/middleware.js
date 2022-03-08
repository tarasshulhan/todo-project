const Tasks = require("./model")

const validateTask = async (req, res, next) => {
  const {
    task_description,
    task_date,
    task_priority,
    task_completed,
    list_id,
  } = req.body
  if (
    !task_description ||
    !task_description.trim() ||
    !task_date ||
    !task_date.trim() ||
    !task_priority ||
    !task_priority.trim() ||
    task_completed === null ||
    !list_id
  ) {
    next({
      status: 400,
      message: "description, date, priority, completed, and list_id required",
    })
  }
  next()
}

const validateTaskId = async (req, res, next) => {
  try {
    const item = await Tasks.getById(req.params.id)
    if (item) {
      next()
    } else {
      next({ status: 404, message: "task not found" })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateTask,
  validateTaskId,
}
