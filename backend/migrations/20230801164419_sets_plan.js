/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sets_plan', table => {
    table.increments();
    table.integer('reps').nullable();
    table.integer('weight').nullable();
    table.integer('distance').nullable();
    table.integer('activity_plan_id')
    table.foreign('activity_plan_id').references('activity_plan.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('sets_plan', table => {
    table.dropForeign('activity_plan_id');
  })
  .then(function(){
    return knex.schema.dropTableIfExists('sets_plan')
  })
};
