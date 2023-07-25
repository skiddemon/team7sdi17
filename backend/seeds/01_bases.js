/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bases').del()
  await knex('bases').insert([
    {name: 'Buckley SFB'},
    {name: 'Peterson SFB'},
    {name: 'Schriever SFB'},
    {name: 'Vandenberg SFB'},
    {name: 'Fort Carson'}
  ]);
};
