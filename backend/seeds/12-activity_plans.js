/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('activity_plan').del()
  await knex('activity_plan').insert([
    {exercise_id: 1, workout_plan_id: 1},
    {exercise_id: 14, workout_plan_id: 1},
    {exercise_id: 4, workout_plan_id: 2},
    {exercise_id: 7, workout_plan_id: 2},
    {exercise_id: 5, workout_plan_id: 3},
    {exercise_id: 2, workout_plan_id: 3},
    {exercise_id: 4, workout_plan_id: 4},
    {exercise_id: 7, workout_plan_id: 4},
    {exercise_id: 12, workout_plan_id: 5}
  ]);
};
