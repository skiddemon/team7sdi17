const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('./knexfile.js')["development"])
const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())

const JWT_SECRET = "THIS IS A SECRET"
//////////////////////// MAIN ROUTE ///////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//////////////////////// LOGIN ROUTE ///////////////////////////////
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log(`User ${username} is attempting to login`)

  try {
    const user = await knex('users')
      .select('id', 'user_name', 'password')
      .where('user_name', username)
      .first()

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      console.log('bcrypt:', isPasswordValid)

      if (isPasswordValid) {
        console.log(`User ${username} has successfully logged in`)

        const token = jwt.sign({ user: user.user_name }, JWT_SECRET)
        const user_name = user.user_name
        res.status(201).json({ token, user_name })
      } else {
        console.log(`User ${username} failed authentication`)
        res.status(401).json({ message: "Failed to authenticate." })
      }
    } else {
      console.log('User does not exist')
      res.status(401).json({ message: "Failed to authenticate" })
    }
  } catch (err) {
    console.log(`Fetch request failed.  Invalid user input`)
    res.status(500).json({ message: "Failed Request" })
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
//////////////////////// EXERCISES ROUTE ///////////////////////////////
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await knex('exercises')
      .select("*")
    res.status(201).json(exercises)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve exercises data.' })
  }
})
//////////////////////// LISTEN FOR THE ABOVE ROUTES ///////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})