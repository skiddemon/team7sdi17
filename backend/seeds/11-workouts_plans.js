/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('workouts_plan').del()
  await knex('workouts_plan').insert([
    {name: 'Chest 1', recipies_id: 1},
    {name: 'Legs 1', recipies_id: 1},
    {name: 'Back 1', recipies_id: 1},
    {name: 'Power 1', recipies_id: 2},
    {name: 'Endurance 1', recipies_id: 2},



  ]);
};
