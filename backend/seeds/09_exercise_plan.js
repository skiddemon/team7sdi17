/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercise_plan').del()
  await knex('exercise_plan').insert([
    {name: 'failed_bench',exercise_id: 1, set_rep_id: 1},
    {name: 'bench_max',exercise_id: 1, set_rep_id: 2},
    {name: 'bench_double',exercise_id: 1, set_rep_id: 3},
    {name: 'pullups_alot',exercise_id: 2, set_rep_id: 29},
    {name: '4x400m',exercise_id: 12, set_rep_id: 26}
  ]);
};
