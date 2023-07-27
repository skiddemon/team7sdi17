const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('./knexfile.js')["development"])
const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())

//this must be in a .env file
const JWT_SECRET = "THIS IS A SECRET"

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}



//////////////////////// MAIN ROUTE ///////////////////////////////
app.get('/', (req, res) => {
  res.send(`
  <a href='http://localhost:8080/login'>Login Page (Currently no GET routes but it does exist)</a>
  <br></br>
  <a href='http://localhost:8080/users'>Users Page</a>
  <br></br>
  <a href='http://localhost:8080/branches'>Branches Page</a>
  <br></br>
  <a href='http://localhost:8080/roles'>Roles Page</a>
  <br></br>
  <a href='http://localhost:8080/bases'>Bases Page</a>
  <br></br>
  <a href='http://localhost:8080/exercises'>Exercises Page</a>
  <br></br>
  `)
})
//////////////////////// LOGIN ROUTE ///////////////////////////////
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log(`User '${username}' is attempting to login`)

  try {
    const user = await knex('users')
      .select('id', 'user_name', 'password')
      .where('user_name', username)
      .first()

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      console.log('bcrypt:', isPasswordValid)

      if (isPasswordValid) {
        console.log(`User '${username}' has successfully logged in`)

        const token = jwt.sign({ user: user.user_name }, JWT_SECRET, {expiresIn: '1h'})
        const user_name = user.user_name
        res.status(201).json({ token, user_name })
      } else {
        console.log(`User '${username}' failed authentication`)
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

///////////////////// SPECIFIC USER ROUTE ////////////////////////
app.get('/user/:specificuser', authenticateToken, async (req, res) => {
  // authenticateToken function has already verified user at this point
  const specificUserName = req.params.specificuser
  console.log(req.user.user)

  console.log(`User '${specificUserName}' has authenticated their token.`)
  if(req.user.user === specificUserName){
  try {
    const userInfo = await knex.select('*').from('users').where({ user_name: specificUserName })
    userInfo.map((e) => {
      delete e.password
    })
    res.status(201).json(userInfo)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users data.' })
  }
}else{
  res.status(500).json({message: 'Failed'})
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

app.post('/exercises', async (req, res) => {
  const {name} = req.body;
  console.log(req.body)
  const newExercise = {
   name: name
  }

  try {
    console.log('do we even get this far?')
    const addedExercisesResponse = await knex('exercises')
      .insert(newExercise)
      .returning('*')

    console.log('exercise response: ', addedExercisesResponse)
    res.status(201).json(addedExercisesResponse)
  } catch (err) {
    res.status(500).json(err.message)
  }

})


//////////////////////// LISTEN FOR THE ABOVE ROUTES ///////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})