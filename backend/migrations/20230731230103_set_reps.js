const tailwindConfig = require("../../frontend/tailwind.config");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('set_reps', table => {
        table.increments('id').primary;
        table.string('name').unique();
        table.integer('sets').notNullable()
        table.integer('reps').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('set_reps');
 
  
};
