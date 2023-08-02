/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('workouts', table => {
    table.increments();
    table.string('name');
    table.integer('user_id')
    table.boolean('completed')
    table.date('workout_date')
    table.foreign('user_id').references("users.id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('workouts', table => {
    table.dropForeign('user_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('workouts')
  })
};
