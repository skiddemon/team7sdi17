/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('workouts_plan', table => {
    table.increments();
    table.string('name');
    table.integer('recipies_id');
    table.foreign('recipies_id').references('recipies.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('workouts_plan', table => {
    table.dropForeign('recipies_id')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('workouts_plan')
  })
};
