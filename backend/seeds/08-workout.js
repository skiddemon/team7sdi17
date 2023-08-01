/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('workouts').del()
  await knex('workouts').insert([
    {name: 'old_git_chest', user_id: 1, workout_date: '2023-07-30'},
    {name: 'john_doe_run', user_id: 2, workout_date: '2023-07-31'}
  ]);
};
