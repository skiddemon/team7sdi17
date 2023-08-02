import {Card, Dropdown, Button, Accordion} from 'flowbite-react'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Set from './set.js'

export default function NewWorkout({ userData, exercises }){
  const [workouts, setWorkouts] = useState([])


  const Navigate = useNavigate()



  const submitWorkout = () => {
    console.log(workouts)
    const workoutData = {
      user_id: userData[0].id,
      user_name: userData[0].user_name,
      workouts: workouts,
    }
    fetch('http://localhost:8080/workout', {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(workoutData)
    })
    .then(res => res.json())
    .then(() => Navigate(`/user/${userData[0].user_name}`))
  }

  const addToWorkouts = (e) => {
    setWorkouts(prevWorkouts => [
        ...prevWorkouts,
        {
          exercise_id: e.exercise_id,
          exercise_name: e.exercise_name,
          exercise_category_id: e.exercise_categories_id,
          sets: []
        }
    ]);
  }

  const updateSet = (workoutIndex, setIndex, newSet) => {
    setWorkouts(prevWorkouts => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[workoutIndex].sets[setIndex] = newSet;
      return newWorkouts;
    });
  };


  const Sets = ({ workout, setWorkouts, workoutIndex }) => {
    console.log(workoutIndex)
    const deleteSet = (workoutIndex, setIndex) => {
      setWorkouts(prevWorkouts => {
        const newWorkouts = [...prevWorkouts];
        newWorkouts[workoutIndex].sets.splice(setIndex, 1);
        return newWorkouts;
      });
    };

    return workout.sets.map((e, setIndex) => {
      console.log(workouts)
      return <Set key={setIndex} set={e} workout={workout} updateSet={updateSet} workoutIndex = {workoutIndex} setIndex={setIndex} deleteSet={deleteSet}/>
    });
  };




  const addSet = (index) => {
    setWorkouts(prevWorkouts => {
        const newWorkouts = [...prevWorkouts];
        newWorkouts[index].sets.push({
            reps: 0,
            weight: 0,
            distance: 0,
            completed:false
        });
        console.log(newWorkouts)
        return newWorkouts;
    });
}

const handleDeleteExercise = (index) => {
  setWorkouts(prevWorkouts => {
    const newWorkouts = [...prevWorkouts];
    newWorkouts.splice(index, 1);
    return newWorkouts;
  });
};


  const List = () => {
    return exercises.map((e) => <Dropdown.Item key={e.exercise_id} onClick={() => addToWorkouts(e)}>{e.exercise_name}</Dropdown.Item>)
  }

  const Workout = () => {
    return workouts.map((e, index) => {
      return(
        <Card key={index} className="w-3/4">
          <div className="flex justify-between">
            <p>{e.exercise_name}</p>
            <Button onClick={() => handleDeleteExercise (index)} color="failure" className="w-fit" alt="Delete this Exercise and Sets">Delete</Button>
          </div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>
                Views Sets
              </Accordion.Title>
              <Accordion.Content>
                {e.sets.length > 0 && (
                  <Sets workout={e} setWorkouts={setWorkouts} workoutIndex={index}/>
                )}
                <div className="flex justify-center mt-5">
                  <Button onClick={() => addSet(index)}>+</Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </Card>
      )
    })
  }

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-center gap-10">
        <Dropdown id='exercise' label="New Exercise">
          <Dropdown.Header>
            <span className="block text-sm">
              Select Exercise
            </span>
          </Dropdown.Header>
          <List alt="exercise list" />
        </Dropdown>
        <Button onClick={() => submitWorkout()}>Submit Workout</Button>
      </div>
      <div className="flex flex-col items-center mt-10 gap-5">
        {workouts.length > 0 && (
          <Workout />
        )}
      </div>

    </div>
  )
}






