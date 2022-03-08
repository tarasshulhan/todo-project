exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      task_id: 0,
      task_description: "Test Task",
      task_date: "05/15/2022",
      task_priority: "low",
      task_completed: 0,
      list_id: 0,
    },
  ])
}
