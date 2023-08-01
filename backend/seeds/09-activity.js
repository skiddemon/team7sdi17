/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('activity').del()
  await knex('activity').insert([
    {exercise_id: 1, workout_id: 1},
    {exercise_id: 14, workout_id: 1},
    {exercise_id: 12, workout_id: 2}
  ]);
};
