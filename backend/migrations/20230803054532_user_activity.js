/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_activity', table => {
    table.increments();
    table.integer('exercise_id')
    table.foreign('exercise_id').references('exercises.id')
    table.integer('user_workout_id')
    table.foreign('user_workout_id').references('user_workout.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_activity', table => {
    table.dropForeign('exercise_id')
    table.dropForeign('user_workouts_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('user_activity')
  })
};
