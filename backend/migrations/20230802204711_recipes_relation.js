/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('workouts', table => {
    table.integer('recipe_id')
    table.foreign('recipe_id').references('recipes.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('workouts', table => {
    table.dropForeign('recipe_id')
  })

};
