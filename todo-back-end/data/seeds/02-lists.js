exports.seed = function (knex) {
  return knex("lists").insert([
    {
      list_id: 0,
      list_name: "Test List",
      list_completed: 0,
    },
  ])
}
