/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_metrics', table => {
    table.increments()
    table.integer('weight')
    table.integer('height')
    table.integer('body_fat')
    table.date('log_date')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_metrics', table => {
    table.dropForeign('user_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('user_metrics')
  })

};
