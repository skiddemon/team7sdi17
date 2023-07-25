/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('branches').del()
  await knex('branches').insert([
    {name: 'Space Force'},
    {name: 'Air Force'},
    {name: 'Army'},
    {name: 'Navy'},
    {name: 'Marines'},
    {name: 'Coast Guard'}
  ]);
};
