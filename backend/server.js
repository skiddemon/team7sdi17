const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const knex = require('knex')(require('./knexfile.js')["development"])
const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())
//////////////////////// MAIN ROUTE ///////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//////////////////////// LOGIN ROUTE ///////////////////////////////
app.post('/login', async (req, res) => {
  const {username, password} = req.body
  console.log(username, password)

  try{
    const user = await knex('users')
    .select('id', 'user_name', 'password')
    .where('user_name', username)
    .first()

    if(user){
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if(isPasswordValid){
        res.status(201).json({id: user.id, username: user.username, token: 8675309})
      }else{
        res.status(401).json({id: ''})
      }
    }else{
      res.status(401).json({id:''})
    }
  }catch(err){
    res.status(500).json({message: "Failed to find user."})
  }
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
  const { first_name, last_name, email, user_name, password, branch_id, base_id } = req.body;
  console.log(req.body)
  const newUser = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    user_name: user_name,
    password: bcrypt.hashSync(password, 10),
    branch_id: branch_id,
    base_id: base_id,
    role_id: 2
  }

  try {
    //  console.log('do we even get this far?')
    const addedUserResponse = await knex('users')
      .insert(newUser)
      .returning('*')

    console.log('user response: ', addedUserResponse)

    delete addedUserResponse.password
    // addedUserResponse = addedUserResponse.map((e) => {
    //   delete e.password
    // })
    res.status(201).json(addedUserResponse)
  } catch (err) {
    res.status(500).json(err.message)
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