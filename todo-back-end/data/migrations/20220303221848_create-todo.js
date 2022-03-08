exports.up = async function (knex) {
  await knex.schema
    .createTable("lists", (table) => {
      table.increments("list_id")
      table.string("list_name", 300).notNullable()
      table.integer("list_completed").unsigned().notNullable().defaultTo(0)
    })
    .createTable("tasks", (table) => {
      table.increments("task_id")
      table.string("task_description", 1000).notNullable()
      table.string("task_date", 10).notNullable()
      table.string("task_priority", 4).notNullable()
      table.integer("task_completed").unsigned().notNullable().defaultTo(0)
      table
        .integer("list_id")
        .unsigned()
        .notNullable()
        .references("list_id")
        .inTable("lists")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT")
    })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("tasks").dropTableIfExists("lists")
}
