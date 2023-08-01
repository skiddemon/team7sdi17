/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('activity_plan', table => {
    table.increments();
    table.integer('exercise_id')
    table.foreign('exercise_id').references('exercises.id')
    table.integer('workout_plan_id')
    table.foreign('workout_plan_id').references('workouts_plan.id')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('activity_plan', table => {
    table.dropForeign('exercise_id')
    table.dropForeign('workout_plan_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('activity_plan')
  })
};
