/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_sets', table => {
    table.increments();
    table.integer('reps').nullable();
    table.integer('weight').nullable();
    table.integer('distance').nullable();
    table.boolean('completed')
    table.integer('user_activity_id')
    table.foreign('user_activity_id').references('user_activity.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_sets', table => {
    table.dropForeign('user_activity_id');
  })
  .then(function(){
    return knex.schema.dropTableIfExists('user_sets')
  })
};
