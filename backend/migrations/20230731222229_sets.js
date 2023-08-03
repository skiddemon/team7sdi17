/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sets', table => {
    table.increments();
    table.integer('reps').nullable();
    table.integer('weight').nullable();
    table.integer('distance').nullable();
    table.boolean('completed')
    table.integer('activity_id')
    table.foreign('activity_id').references('activity.id')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('sets', table => {
    table.dropForeign('activity_id');
  })
  .then(function(){
    return knex.schema.dropTableIfExists('sets')
  })

};
