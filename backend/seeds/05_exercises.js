/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercises').del()
  await knex('exercises').insert([
    {name: 'Bench Press'},
    {name: 'Pull Ups'},
    {name: 'Lateral Raises'},
    {name: 'Squats'},
    {name: 'Deadlifts'},
    {name: 'Arnold Presses'},
    {name: 'Calf Raises'},
    {name: 'Skull Crushers'},
    {name: 'Barbell Curls'},
    {name: 'Tricep Extensions'},
    {name: 'Weighted Dips'}
  ]);
};
