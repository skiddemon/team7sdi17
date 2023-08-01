/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('activity', table => {
    table.increments();
    table.integer('exercise_id')
    table.foreign('exercise_id').references('exercises.id')
    table.integer('workout_id')
    table.foreign('workout_id').references('workouts.id')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('activity', table => {
    table.dropForeign('exercise_id')
    table.dropForeign('workout_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('activity')
  })

};
