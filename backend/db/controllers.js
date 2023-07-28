const knex = require("./dbConnection");

const getExercisesWithCategories = () => {
  return knex('exercises')
    .select('exercises.id as id','exercises.name as exercise', 'exercise_categories.name as category','exercise_categories.id as exercise_categories_id')
    .join('exercise_categories', 'exercises.exercise_category_id', '=', 'exercise_categories.id')
}

module.exports = {getExercisesWithCategories}