/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercises').del()
  await knex('exercises').insert([
    {name: 'Bench Press', exercise_category_id: 1},
    {name: 'Pull Ups', exercise_category_id: 1},
    {name: 'Lateral Raises', exercise_category_id: 1},
    {name: 'Squats', exercise_category_id: 1},
    {name: 'Deadlifts', exercise_category_id: 1},
    {name: 'Arnold Presses', exercise_category_id: 1},
    {name: 'Calf Raises', exercise_category_id: 1},
    {name: 'Skull Crushers', exercise_category_id: 1},
    {name: 'Barbell Curls', exercise_category_id: 1},
    {name: 'Tricep Extensions', exercise_category_id: 1},
    {name: 'Weighted Dips', exercise_category_id: 1},
    {name: 'running', exercise_category_id: 2},
    {name: 'treadmill', exercise_category_id: 2},
    {name: 'Push-ups', exercise_category_id: 3},
    {name: 'Box Jumps', exercise_category_id: 3}
  ]);
};
