/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('logs', table => {
        table.increments('id').primary;
        table.datetime('some_time', {precision: 6}).defaultTo(knex.fn.now(6));//change some_time to date_time
        table.integer('exercise_id');
        table.integer('sets');
        table.integer('reps');
        table.integer('distance');
        table.integer('weight');
        table.integer('split');
        table.string('comments');
        table.integer('user_id');
        table.foreign('exercise_id').references('exercises.id');
        table.foreign('user_id').references('users.id');

})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('logs', table => {
        table.dropForeign('exercise_id');
        table.dropForeign('user_id');
    })
    .then(function(){
        return knex.schema.dropTableIfExists('logs');
    })
};
