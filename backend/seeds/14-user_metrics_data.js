/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_metrics').del()
  await knex('user_metrics').insert([
    {weight: 240, height: 70, body_fat: 10, log_date: '2021-02-10', user_id: 1},
    {weight: 165, height: 68, body_fat: 15, log_date: '2021-02-10', user_id: 2},
    {weight: 235, height: 74, body_fat: 5, log_date: '2021-02-10', user_id: 3},
    {weight: 242, height: 70, body_fat: 8, log_date: '2022-02-10', user_id: 1},
    {weight: 155, height: 68, body_fat: 12, log_date: '2022-02-10', user_id: 2},
    {weight: 240, height: 74, body_fat: 8, log_date: '2022-02-10', user_id: 3},
    {weight: 236, height: 70, body_fat: 10, log_date: '2023-02-10', user_id: 1},
    {weight: 160, height: 68, body_fat: 15, log_date: '2023-02-10', user_id: 2},
    {weight: 230, height: 74, body_fat: 6, log_date: '2023-02-10', user_id: 3}
  ]);
};
