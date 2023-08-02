/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pt_tests', table => {
    table.increments();
    table.integer('run_time')
    table.integer('push_ups')
    table.integer('sit_ups')
    table.integer('score')
    table.date('test_date')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('pt_tests', table => {
    table.dropForeign('user_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('pt_tests')
  })

};
