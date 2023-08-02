/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipies').del()
  await knex('recipies').insert([
    {name: 'Superman', description: 'Unleash your inner Superman with this strength-focused workout designed to turn you into a powerhouse. Lift heavy and build muscles like never before, as you tap into the strength and resilience of the Man of Steel.', image: 'https://cdn.pixabay.com/photo/2017/07/06/18/48/superman-2478978_1280.jpg'},
    {name: 'Flash', description: 'Channel the lightning-fast speed and endurance of the Flash with this leg-centric workout. Push your limits, improve your agility, and build unstoppable endurance as you race through this intense routine.', image:'https://drawinghowtos.com/wp-content/uploads/2021/07/The-flash-colored.png'}
  ]);
};
