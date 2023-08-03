const { getExercisesWithCategories } = require('./db/controllers.js');

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('./db/dbConnection.js')
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
  <a href='http://localhost:8080/logs'>Logs</a>
  <br></br>
  <a href='http://localhost:8080/plans'>Workout Plans</a>
  <br></br>
  <a href='http://localhost:8080/metrics'>Metrics</a>
  <br></br>
  <a href='http://localhost:8080/ptTests'>PT Tests</a>
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

        const token = jwt.sign({ user: user.user_name }, JWT_SECRET, { expiresIn: '1h' })
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
  const { first_name, last_name, email, user_name } = req.query;

  console.log(last_name, first_name, email, user_name)
  try {
    let query = knex('users').select("*");

    if (user_name) {
      query = query.where('user_name', 'ilike', `%${user_name}%`);
    } else if (email) {
      query = query.where('email', 'ilike', email);
    } else if (last_name) {
      query = query.where('last_name', 'ilike', `%${last_name}%`);
      if (first_name) {
        query = query.where('first_name', 'ilike', `%${first_name}%`);
      }
    }
    const users = await query;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve user." });
  }
});

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

app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, role_id, user_name } = req.body;

  try {
    let userToUpdate = {};

    if (last_name) userToUpdate.last_name = last_name;
    if (first_name) userToUpdate.first_name = first_name;
    if (email) userToUpdate.email = email;
    if (role_id) userToUpdate.role_id = role_id;
    if (user_name) userToUpdate.user_name = user_name;

    const updatedUser = await knex('users')
      .where({ id })
      .update(userToUpdate)
      .returning("*");

    if (!updatedUser.length) {
      return res.status(404).json({ message: "User Not Found!" })
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.delete('/users/delete/:id', async (req, res) => {
  const { id } = req.params

  try {
    await knex('users')
      .delete()
      .where('id', id)

    res.status(200).json({ message: "User Deleted" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete User." })
  }
})

///////////////////// SPECIFIC USER ROUTE ////////////////////////
app.get('/user/:specificuser', authenticateToken, async (req, res) => {
  // authenticateToken function has already verified user at this point
  const specificUserName = req.params.specificuser
  console.log(req.user.user)

  console.log(`User '${specificUserName}' has authenticated their token.`)
  if (req.user.user === specificUserName) {
    try {
      const userInfo = await knex.select('*').from('users').where({ user_name: specificUserName })
      userInfo.map((e) => {
        delete e.password
      })
      res.status(201).json(userInfo)
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve users data.' })
    }
  } else {
    res.status(500).json({ message: 'Failed' })
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
app.get('/exercises', authenticateToken, async (req, res) => {
  try {
    const exercises = await getExercisesWithCategories();
    res.status(201).json(exercises)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve exercises data.' })
  }
})

app.post('/exercises', async (req, res) => {
  const { name } = req.body;
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
//////////////////////// LOGS ROUTE ////////////////////////////////////////////////
app.get('/logs', async (req, res) => {
  const specificUserId = req.body.user_id
  console.log(req.body.user_id)

  console.log(`User '${specificUserId}' has logs`)
  if (req.body.user_id === specificUserId) {
    try {
      const userLogs = await knex.select('*').from('logs')
      res.status(201).json(userLogs)
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve users logs.' })
    }
  } else {
    res.status(500).json({ message: 'Failed' })
  }
});

app.get('/logs/:id', async (req, res) => {
  const specificUserId = req.params.id
  console.log(req.params.id)

  console.log(`User '${specificUserId}' has logs`)
  if (req.params.id === specificUserId) {
    try {
      const userLogs = await knex.select('*').from('logs').where({ user_id: specificUserId })
      res.status(201).json(userLogs)
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve users logs.' })
    }
  } else {
    res.status(500).json({ message: 'Failed' })
  }
});



app.get('/workout/history/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const workoutHistory = await knex('workouts')
      .where('user_id', id)
      .join('activity', 'workouts.id', 'activity.workout_id')
      .join('exercises', 'activity.exercise_id', 'exercises.id')
      .join('sets', 'activity.id', 'sets.activity_id')
      .select(
        'workouts.id as workout_id',
        'workouts.name as workout_name',
        'workouts.workout_date',
        'activity.id as activity_id',
        'exercises.id as exercise_id',
        'exercises.exercise_category_id as category_id',
        'exercises.name as exercise_name',
        'sets.reps',
        'sets.weight',
        'sets.distance'
      );

      const result = workoutHistory.reduce((accumulator, current) => {
        let workout = accumulator.find(e => e.id === current.workout_id);
        if (!workout) {
          workout = {
            id: current.workout_id,
            name: current.workout_name,
            workout_date: current.workout_date,
            activity: []
          };
          accumulator.push(workout);
        }

        let activity = workout.activity.find(e => e.exercise_id === current.exercise_id);
        if (!activity) {
          activity = {
            exercise_id: current.exercise_id,
            exercise_name: current.exercise_name,
            category_id: current.category_id,
            sets: []
          };
          workout.activity.push(activity);
        }

        activity.sets.push({
          reps: current.reps,
          weight: current.weight,
          distance: current.distance,
          completed: current.completed
        });

        return accumulator;
        }, [])

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'There was an error retrieving the workout history' });
  }
});

app.get('/plans', async (req, res) => {
  try {
    const recipes = await knex('recipes')
      .join('workouts_plan', 'recipes.id', 'workouts_plan.recipes_id')
      .join('activity_plan', 'workouts_plan.id', 'activity_plan.workout_plan_id')
      .join('exercises', 'activity_plan.exercise_id', 'exercises.id')
      .join('sets_plan', 'activity_plan.id', 'sets_plan.activity_plan_id')
      .select(
        'recipes.name as plan_name',
        'recipes.id as recipe_id',
        'recipes.description as description',
        'recipes.image as image',
        'workouts_plan.id as workout_id',
        'workouts_plan.name as workout_name',
        'activity_plan.id as activity_id',
        'exercises.id as exercise_id',
        'exercises.exercise_category_id as category_id',
        'exercises.name as exercise_name',
        'sets_plan.reps',
        'sets_plan.weight',
        'sets_plan.distance',
        'sets_plan.completed'
      );

    const result = recipes.reduce((accumulator, current) => {
      let recipe = accumulator.find((e) => e.id === current.recipe_id);
      if (!recipe) {
        recipe = {
          id: current.recipe_id,
          name: current.plan_name,
          description: current.description,
          image: current.image,
          workouts: []
        };
        accumulator.push(recipe);
      }

      let workout = recipe.workouts.find(e => e.id === current.workout_id);
      if (!workout) {
        workout = {
          id: current.workout_id,
          name: current.workout_name,
          activity: []
        };
        recipe.workouts.push(workout);
      }

      let activity = workout.activity.find(e => e.exercise_id === current.exercise_id);
      if (!activity) {
        activity = {
          exercise_id: current.exercise_id,
          exercise_name: current.exercise_name,
          category_id: current.category_id,
          sets: []
        };
        workout.activity.push(activity);
      }

      activity.sets.push({
        reps: current.reps,
        weight: current.weight,
        distance: current.distance,
        completed: current.completed
      });

      return accumulator;
    }, [])

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve plans." });
  }
});



app.post('/workout', async (req, res) => {
  const { workouts, user_name, user_id, name, completed, recipe_id} = req.body

  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const workoutToAdd = {
    name: name,
    user_id: user_id,
    completed: completed,
    recipe_id: recipe_id,
    workout_date: dateString
  }

  const addedWorkout = await knex('workouts')
    .insert(workoutToAdd)
    .returning("*")

  await Promise.all(workouts.map(async (e) => {
    const activityToAdd = {
      exercise_id: e.exercise_id,
      workout_id: addedWorkout[0].id
    }

    const addedActivity = await knex('activity')
      .insert(activityToAdd)
      .returning("*")

    await Promise.all(e.sets.map(async (i) => {
      console.log(i)
      const setToAdd = {
        reps: i.reps,
        weight: i.weight,
        distance: i.distance,
        completed: i.completed,
        activity_id: addedActivity[0].id
      }
      await knex('sets')
        .insert(setToAdd)
    }))
  }))
  res.status(200).json({ message: "great success" })

})


//////////////////////////////  WORKOUTPLAN ENDPOINT  /////////////////////////////
app.get('/workoutplan/:id', async (req, res) => {
  const { id } = req.params
  try {
    const workoutHistory = await knex('user_workouts')
      .where('user_id', id)
      .join('user_activity', 'user_workouts.id', 'user_activity.user_workout_id')
      .join('exercises', 'user_activity.exercise_id', 'exercises.id')
      .join('user_sets', 'user_activity.id', 'user_sets.user_activity_id')
      .select(
        'user_workouts.id as workout_id',
        'user_workouts.name as workout_name',

        'user_activity.id as activity_id',
        'exercises.id as exercise_id',
        'exercises.exercise_category_id as exercise_category_id',
        'exercises.name as exercise_name',
        'user_sets.reps',
        'user_sets.weight',
        'user_sets.distance',
        'user_sets.completed'
      );

      const result = workoutHistory.reduce((accumulator, current) => {
        let workout = accumulator.find(e => e.id === current.workout_id);
        if (!workout) {
          workout = {
            id: current.workout_id,
            name: current.workout_name,
            activity: []
          };
          accumulator.push(workout);
        }

        let activity = workout.activity.find(e => e.exercise_id === current.exercise_id);
        if (!activity) {
          activity = {
            exercise_id: current.exercise_id,
            exercise_name: current.exercise_name,
            exercise_category_id: current.exercise_category_id,
            sets: []
          };
          workout.activity.push(activity);
        }

        activity.sets.push({
          reps: current.reps,
          weight: current.weight,
          distance: current.distance,
          completed: current.completed
        });

        return accumulator;
        }, [])

    res.status(200).json(result);

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Fetch error"})
  }
})

app.post('/workoutplan', async (req, res) => {
  const { workouts, user_name, user_id, name } = req.body
  const today = new Date();


  const workoutToAdd = {
    name: name,
    user_id: user_id,
  }

  const addedWorkout = await knex('user_workouts')
    .insert(workoutToAdd)
    .returning("*")

  await Promise.all(workouts.map(async (e) => {
    const activityToAdd = {
      exercise_id: e.exercise_id,
      user_workout_id: addedWorkout[0].id
    }

    const addedActivity = await knex('user_activity')
      .insert(activityToAdd)
      .returning("*")

    await Promise.all(e.sets.map(async (i) => {
      const setToAdd = {
        reps: 0,
        weight: 0,
        distance: 0,
        completed: false,
        user_activity_id: addedActivity[0].id
      }
      await knex('user_sets')
        .insert(setToAdd)
    }))
  }))
  res.status(200).json({ message: "great success" })

})
//-----------------------------------------------------------------------------------------

app.post('/recipe', async (req, res) => {
  console.log('hi')
  const { recipe } = req.body;

  const recipeToAdd = {
    name: recipe.name,
    description: recipe.description,
    image: recipe.image
  };

  const addedrecipe = await knex('recipes')
    .insert(recipeToAdd)
    .returning('*');

  await Promise.all(recipe.workouts.map(async (e) => {
    const workoutToAdd = {
      name: e.name,
      recipes_id: addedrecipe[0].id
    };

    const addedWorkout = await knex('workouts_plan')
      .insert(workoutToAdd)
      .returning('*');

    await Promise.all(e.activity.map(async (i) => {

      const activityToAdd = {
        exercise_id: i.exercise_id,
        workout_plan_id: addedWorkout[0].id
      };

      const addedActivity = await knex('activity_plan')
        .insert(activityToAdd)
        .returning('*');


      await Promise.all(i.sets.map(async (j) => {
        const setToAdd = {
          reps: j.reps,
          weight: j.weight,
          distance: j.distance,
          activity_plan_id: addedActivity[0].id
        };

        await knex('sets_plan').insert(setToAdd);
      })
      );
    })
    );
  })
  );

  res.status(200).json({ message: 'success', addedrecipe: addedrecipe[0] });
});






//-------------------------------extra stuff----------------------------------------------------------

app.get('/metrics', async (req, res) => {
  try {
    const allMetrics = await knex('user_metrics').select('*')
    res.status(200).json(allMetrics)
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve all metrics" })
  }
})

app.get('/metrics/:id', async (req, res) => {
  const { id } = req.params

  try {
    const userMetrics = await knex('user_metrics')
      .select('*')
      .where('user_id', id)

    res.status(200).json(userMetrics)
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve metrics" })
  }
})

app.get('/ptTests', async (req, res) => {
  try {
    const allPtTests = await knex('pt_tests')
    .select('*')
    res.status(200).json(allPtTests)
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve all metrics" })
  }
})

app.get('/ptTests/:id', async (req, res) => {
  const { id } = req.params

  try {
    const userTests = await knex('pt_tests')
      .select('*')
      .where('user_id', id)
      .orderBy('test_date')

    res.status(200).json(userTests)
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tests' })
  }
})



app.get('/plans/:id', async (req, res) => {
  const {id} = req.params
  console.log(id)
  try{
    const userPlan = await knex('recipes')
    .join('workouts', 'recipes.id', 'workouts.recipe_id')
    .where('workouts.user_id', id)
    .select(
      'recipes.id as recipe_id',
      'recipes.description as description',
      'recipes.image as image',
      'recipes.name as plan_name',
      'workouts.id'
    )
    .where('completed', false)

    console.log(userPlan)
    const plans = userPlan.reduce((accumulator, current) => {
      let recipe = accumulator.find((e) => e.id === current.recipe_id);
      if (!recipe) {
        recipe = {
          id: current.recipe_id,
          name: current.plan_name,
          description: current.description,
          image: current.image
        };
        accumulator.push(recipe);
      }
      return accumulator
    }, [])


    res.status(200).json(plans)
  }catch(err){
    console.log(err)
    res.status(500).json({message: 'Failed to retrieve plans'})
  }
})

app.get('/nextWorkout/:id', async (req, res) => {
  const {id} = req.params;
try{
  const workoutId = await knex('workouts')
  .select("id")
  .where('workouts.recipe_id', id)
  .where('workouts.completed', false)
  .first()


  const workout = await knex('workouts')
  .join('activity', 'workouts.id', 'activity.workout_id')
  .join('exercises', 'activity.exercise_id', 'exercises.id')
  .join('sets', 'activity.id', 'sets.activity_id')
  .select(
    'workouts.id as workout_id',
    'workouts.name as workout_name',
    'workouts.workout_date',
    'activity.id as activity_id',
    'exercises.id as exercise_id',
    'exercises.exercise_category_id as exercise_category_id',
    'exercises.name as exercise_name',
    'sets.id',
    'sets.reps',
    'sets.weight',
    'sets.distance'
          )
  .where("workouts.id", workoutId.id)


  const result = workout.reduce((accumulator, current) => {
    let workout = accumulator.find(e => e.id === current.workout_id);
    if (!workout) {
      workout = {
        id: current.workout_id,
        name: current.workout_name,
        activity: []
      };
      accumulator.push(workout);
    }

    let activity = workout.activity.find(e => e.exercise_id === current.exercise_id);
    if (!activity) {
      activity = {
        exercise_id: current.exercise_id,
        exercise_name: current.exercise_name,
        exercise_category_id: current.exercise_category_id,
        sets: []
      };
      workout.activity.push(activity);
    }

    activity.sets.push({
      id: current.id,
      reps: current.reps,
      weight: current.weight,
      distance: current.distance,
      completed: current.completed
    });

    return accumulator;
    }, [])

  res.status(200).json(result)
}catch(err){
  console.log(err)
  res.status(500).json({message: 'failed to retrieve next workout'})
}

})


app.patch('/workout/:id', async (req, res) => {
  const {id} = req.params
  const {workouts} = req.body
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  try{
    const workoutToUpdate = {
      completed: true,
      workout_date: dateString
    }

    const updatedWorkout = await knex('workouts')
    .where({id})
    .update(workoutToUpdate)
    .returning("*")

    workouts.activity.forEach( async (e) => {

      e.sets.forEach(async (e) => {
        console.log(e.id)
        const setToUpdate ={
          reps: e.reps,
          weight: e.weight,
          distance: e.distance,
          completed: true
        }
        await knex('sets')
        .where('id', e.id)
        .update(setToUpdate)
      })
    })

    res.status(200).json({message: "success"})
  }catch(err){
    console.log(err)
    res.status(500).json({message:"failed to patch"})
  }
})

//////////////////////// LISTEN FOR THE ABOVE ROUTES ///////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})