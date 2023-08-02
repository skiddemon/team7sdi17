/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('workouts_plan', table => {
    table.increments();
    table.string('name');
    table.integer('recipes_id');
    table.foreign('recipes_id').references('recipes.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('workouts_plan', table => {
    table.dropForeign('recipes_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('workouts_plan')
  })
};
