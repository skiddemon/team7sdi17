
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const knex = require('knex')(require('./knexfile.js')["development"])
const app = express()
const port = 8080;

app.use(express())
app.use(cors())
//////////////////////// MAIN ROUTE ///////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//////////////////////// BRANCHES ROUTE ///////////////////////////////
app.get('/branches', async (req, res) => {
  try {
    const branches = await knex('branches')
      .select("*")
    res.status(201).json(branches)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve branch data.' })
  }
})
//////////////////////// USERS ROUTE ///////////////////////////////
app.get('/users', async (req, res) => {
  try {
    const users = await knex.select("*").from('users')
    users.map((e) => {
      delete e.password
    })
    res.status(201).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users data.' })
  }
})

app.post('/users', async (req, res) => {
  const {first_name, last_name, email, password, branch, base} = req.body;
  const new_user = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    branch_id: branch,
    base_id: base,
    role: 2
  }

  try{
   const  knex('users').insert(testData)
        .then(()=>{
            console.log("KNEXPROMISE", testData)
            response.status(200).json({testData});
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
  }
})

//////////////////////// ROLES ROUTE ///////////////////////////////
app.get('/roles', async (req, res) => {
  try {
    const roles = await knex.select('*').from('roles')
    res.status(201).json(roles)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve roles data.' })
  }
})
//////////////////////// BASES ROUTE ///////////////////////////////
app.get('/bases', async (req, res) => {
  try {
    const bases = await knex('bases')
      .select("*")
    res.status(201).json(bases)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve bases data.' })
  }
})

//////////////////////// LISTEN FOR THE ABOVE ROUTES ///////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})