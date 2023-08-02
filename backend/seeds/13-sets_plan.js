/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sets_plan').del()
  await knex('sets_plan').insert([
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 1},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 1},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 2},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 2},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 3},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 3},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 4},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 4},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 5},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 5},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 6},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 6},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 7},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 7},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 8},
    {reps: 10, weight: 0, distance: 0, activity_plan_id: 8},
    {reps: 0, weight: 0, distance: 10, activity_plan_id: 9},
  ]);
};
