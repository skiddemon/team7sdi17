/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sets').del()
  await knex('sets').insert([
    {reps: 10, weight: 100, activity_id: 1},
    {reps: 8, weight: 100, activity_id: 1},
    {reps: 11, weight: 75, activity_id: 2},
    {reps: 5, weight: 75, activity_id: 2},
    {distance: 10, activity_id:3}
  ]);
};
