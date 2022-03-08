const router = require("express").Router()
const Lists = require("./model")
const { validateList, validateListId } = require("./middleware")

router.get("/", (req, res, next) => {
  Lists.get()
    .then((lists) => {
      const newLists = lists.map((list) => {
        if (list.list_completed === 0) {
          return { ...list, list_completed: false }
        } else {
          return { ...list, list_completed: true }
        }
      })
      res.status(200).json(newLists)
    })
    .catch(next)
})

router.get("/:id", validateListId, (req, res, next) => {
  if (req.body.list_completed === true) {
    req.body = { ...req.body, list_completed: 1 }
  } else if (req.body.list_completed === false) {
    req.body = { ...req.body, list_completed: 0 }
  }
  Lists.getById(req.params.id)
    .then((list) => {
      if (list.list_completed === 0) {
        res.status(200).json({ ...list, list_completed: false })
      } else {
        res.status(200).json({ ...list, list_completed: true })
      }
    })
    .catch(next)
})

router.post("/", (req, res, next) => {
  if (req.body.list_completed === true) {
    req.body = { ...req.body, list_completed: 1 }
  } else if (req.body.list_completed === false) {
    req.body = { ...req.body, list_completed: 0 }
  }
  Lists.create(req.body)
    .then((list) => {
      if (list.list_completed === 0) {
        res.status(200).json({ ...list, list_completed: false })
      } else {
        res.status(200).json({ ...list, list_completed: true })
      }
    })
    .catch(next)
})

router.put("/:id", validateListId, validateList, (req, res, next) => {
  if (req.body.list_completed === true) {
    req.body = { ...req.body, list_completed: 1 }
  } else if (req.body.list_completed === false) {
    req.body = { ...req.body, list_completed: 0 }
  }
  Lists.update(req.params.id, req.body)
    .then((list) => {
      if (list.list_completed === 0) {
        res.status(200).json({ ...list, list_completed: false })
      } else {
        res.status(200).json({ ...list, list_completed: true })
      }
    })
    .catch(next)
})
router.delete("/:id", validateListId, (req, res, next) => {
  Lists.remove(req.params.id)
    .then(res.status(200).json(`list deleted successfully`))
    .catch(next)
})

module.exports = router
