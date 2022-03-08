const Lists = require("./model")

const validateList = async (req, res, next) => {
  const { list_name, list_completed } = req.body
  if (!list_name || !list_name.trim() || list_completed === null) {
    next({
      status: 400,
      message: "name and completed required",
    })
  }
  next()
}

const validateListId = async (req, res, next) => {
  try {
    const item = await Lists.getById(req.params.id)
    if (item) {
      next()
    } else {
      next({ status: 404, message: "list not found" })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateList,
  validateListId,
}
