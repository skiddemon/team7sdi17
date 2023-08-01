/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('set_reps').del()
  await knex('set_reps').insert([
    {name: 'Failed', sets: 0 , reps: 0},
    {name: 'MAX', sets: 1 , reps: 1},
    {name: 'DOUBLE',sets: 1 , reps: 2},
    {name: 'QUAD',sets: 1 , reps: 4},
    {name: 'HEX',sets: 1 , reps: 6},
    {name: 'OCTET',sets: 1 , reps: 8},
    {name: 'TEN',sets: 1 , reps: 10},
    {name: 'TWELVES',sets: 1 , reps: 12},
    {name: 'TWO_ONE',sets: 2 , reps: 1},
    {name: 'TWO_TWO',sets: 2 , reps: 2},
    {name: 'TWO_FOUR',sets: 2 , reps: 4},
    {name: 'TW0_SIX',sets: 1 , reps: 6},
    {name: 'TWO_EIGHT',sets: 2 , reps: 8},
    {name: 'TWO_TEN',sets: 1 , reps: 10},
    {name: 'TWO_TWELVE',sets: 2 , reps: 12},
    {name: 'THREE_ONE',sets: 3 , reps: 1},
    {name: 'THREE_TWO',sets: 3 , reps: 2},
    {name: 'THREE_FOUR',sets: 3 , reps: 4},
    {name: 'THREE_SIX',sets: 3, reps: 6},
    {name: 'THREE_EIGHT',sets: 3 , reps: 8},
    {name: 'THREE_TEN',sets: 3, reps: 10},
    {name: 'THREE_TWELVE',sets: 3 , reps: 12},
    {name: 'FOUR_ONE',sets: 4 , reps: 1},
    {name: 'FOUR_TWO',sets: 4 , reps: 2},
    {name: 'FOUR_FOUR',sets: 4 , reps: 4},
    {name: 'FOUR_SIX',sets:  4, reps: 6},
    {name: 'FOUR_EIGHT',sets: 4 , reps: 8},
    {name: 'FOUR_TEN',sets: 4, reps: 10},
    {name: 'FOUR_TWELVE',sets: 4 , reps: 12},
    {name: 'FIVE_ONE',sets: 5 , reps: 1},
    {name: 'FIVE_TWO',sets: 5 , reps: 2},
    {name: 'FIVE_FOUR',sets: 5 , reps: 4},
    {name: 'FIVE_SIX',sets: 5, reps: 6},
    {name: 'FIVE_EIGHT',sets: 5 , reps: 8},
    {name: 'FIVE_TEN',sets: 5 , reps: 10},
    {name: 'FIVE_TWELVE',sets: 5 , reps: 12},
    {name: 'SIX_ONE',sets: 6 , reps: 1},
    {name: 'SIX_TWO',sets: 6 , reps: 2},
    {name: 'SIX_FOUR',sets: 6 , reps: 4},
    {name: 'SIX_SIX',sets: 6 , reps: 6},
    {name: 'SIX_EIGHT',sets: 6 , reps: 8},
    {name: 'SIX_TEN',sets: 6 , reps: 10},
    {name: 'SIX_TWELVE',sets: 6 , reps: 12}
  ]);
};
