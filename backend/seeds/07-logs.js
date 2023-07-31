/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('logs').del()
  await knex('logs').insert([
    {exercise_id: 1, sets: 3, reps: 8, distance: 0, weight: 125, split: 0, comments: 'i did stuff, felt good.', user_id: 1 },
    {exercise_id: 2, sets: 3, reps: 8, distance: 0, weight: 125, split: 0, comments: 'i did stuff, felt good.', user_id: 1 },
    {exercise_id: 3, sets: 3, reps: 8, distance: 0, weight: 125, split: 0, comments: 'i did stuff, felt good.', user_id: 1 },
    {exercise_id: 12, sets: 1, reps: 4, distance: 400, weight: 0, split: 400, comments: 'i did stuff, felt good.', user_id: 2 }

  ]);
};
