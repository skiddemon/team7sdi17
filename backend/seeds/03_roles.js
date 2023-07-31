/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {role: 'admin'},
    {role: 'user'},
    {role: 'trainer'}
  ]);
};


/*if(user.role_id === 1){
  return "Admin"
}else if(user.role_id === 2){
  return "User"
}else{
  return "Trainer"
}