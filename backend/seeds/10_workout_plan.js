/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('workout_plan').del()
  await knex('workout_plan').insert([
    { name: 'chest_day', exercise_plan_csv: '1,2,3'},
    { name: 'speed_day', exercise_plan_csv: '5'},
    { name: 'endurance_day', exercise_plan_csv: '4'}
  ]);
};