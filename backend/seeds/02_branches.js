/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('branches').del()
  await knex('branches').insert([
    {branch: 'Space Force'},
    {branch: 'Air Force'},
    {branch: 'Army'},
    {branch: 'Navy'},
    {branch: 'Marines'},
    {branch: 'Coast Guard'}
  ]);
};
