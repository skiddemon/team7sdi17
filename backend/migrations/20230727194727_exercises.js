/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exercises', table => {
        table.increments('id').primary;
        table.string('name').unique().notNullable();
        table.integer('exercise_category_id'); 
        table.foreign('exercise_category_id').references('exercise_categories.id'); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('exercises', table => {
        table.dropForeign('exercise_category_id');
    })
    .then(function(){
        return knex.schema.dropTableIfExists('exercises');
    })
};
