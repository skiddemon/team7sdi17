/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary;
    table.string('first_name');
    table.string('last_name');
    table.string('username').unique();
    table.string('password');
    table.integer('branch_id');
    table.foreign('branch_id').references('branches.id');
    table.integer('base_id');
    table.foreign('base_id').references('bases.id');
    table.integer('role_id');
    table.foreign('role_id').references('roles.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropForeign('branch_id');
    table.dropForeign('base_id');
    table.dropForeign('role_id');
  })
  .then(function(){
    return knex.schema.dropTableIfExists('users');
  })
};
