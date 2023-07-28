const knex = require("./dbConnection");

const getExercisesWithCategories = () => {
  return knex('exercises')
    .select('exercises.id as exercise_id','exercises.name as exercise_name', 'exercise_categories.name as category_name','exercise_categories.id as exercise_categories_id')
    .join('exercise_categories', 'exercises.exercise_category_id', '=', 'exercise_categories.id')
}

module.exports = {getExercisesWithCategories}