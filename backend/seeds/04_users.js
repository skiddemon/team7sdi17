const bcrypt = require('bcryptjs')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'Linus',
      last_name: 'Torvalds',
      email: 'Linus.Torvalds@gmail.com',
      user_name: 'old_git',
      password: bcrypt.hashSync('pwd', 10),
      branch_id: 1,
      base_id: 1,
      role_id: 1
    },
    { first_name: 'John',
      last_name: 'Doe',
      email: 'John.Doe@gmail.com',
      user_name: 'j_doe',
      password: bcrypt.hashSync('pwd', 10),
      branch_id: 2,
      base_id: 2,
      role_id: 2
    },
    { first_name: 'Arnold',
      last_name: 'Schwarzenegger',
      email: 'Arnold.Schwarzenegger@gmail.com',
      user_name: 'mr_olympia',
      password: bcrypt.hashSync('pwd', 10),
      branch_id: 3,
      base_id: 3,
      role_id: 3
    }
  ]);
};
