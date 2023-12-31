/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_workouts', table => {
    table.increments();
    table.string('name');
    table.integer('user_id')
    table.foreign('user_id').references("users.id")
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_workouts', table => {
    table.dropForeign('user_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('user_workouts')
  })
};
