/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pt_tests').del()
  await knex('pt_tests').insert([
    {run_time: 660, push_ups: 102, sit_ups: 112, score: 95, test_date: '2021-02-10', user_id: 1},
    {run_time: 720, push_ups: 58, sit_ups: 42, score: 100, test_date: '2021-02-10', user_id: 2},
    {run_time: 480, push_ups: 100, sit_ups: 100, score: 100, test_date: '2021-02-10', user_id: 3},
    {run_time: 720, push_ups: 120, sit_ups: 142, score: 90, test_date: '2022-02-10', user_id: 1},
    {run_time: 720, push_ups: 67, sit_ups: 58, score: 100, test_date: '2022-02-10', user_id: 2},
    {run_time: 480, push_ups: 90, sit_ups: 82, score: 100, test_date: '2022-02-10', user_id: 3},
    {run_time: 480, push_ups: 100, sit_ups: 105, score: 100, test_date: '2023-02-10', user_id: 1},
    {run_time: 720, push_ups: 67, sit_ups: 58, score: 100, test_date: '2023-02-10', user_id: 2},
    {run_time: 480, push_ups: 100, sit_ups: 100, score: 100, test_date: '2023-02-10', user_id: 3}
  ]);
};
