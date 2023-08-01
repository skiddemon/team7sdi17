/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exercise_plan', table => {
        table.increments('id').primary;
        table.string('name').unique();
        table.integer('exercise_id').notNullable();
        table.integer('set_rep_id').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('exercise_plan', table => {
        table.dropForeign('exercise_id');
        table.dropForeign('set_rep_id');
    })
    .then(function(){
        return knex.schema.dropTableIfExists('exercise_plan');
    })
  
};
