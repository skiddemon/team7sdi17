/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bases').del()
  await knex('bases').insert([
    {base: 'Buckley SFB'},
    {base: 'Peterson SFB'},
    {base: 'Schriever SFB'},
    {base: 'Vandenberg SFB'},
    {base: 'Fort Carson'}
  ]);
};
