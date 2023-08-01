/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('workout_plan', table => {
        table.increments('id').primary;
        table.string('name').unique();   
        table.string('exercise_plan_csv').unique();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {   
    return knex.schema.dropTableIfExists('workout_plan');
};
