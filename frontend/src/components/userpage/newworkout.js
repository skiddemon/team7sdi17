import { Card, Dropdown, Button, Accordion, TextInput, Modal, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Set from './set.js'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader.js'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody.js'

export default function NewWorkout({ userData, exercises }) {
  const [workouts, setWorkouts] = useState([]);
  const [submitWorkoutButton, setSubmitWorkoutButton] = useState(false)
  const [nameWorkoutModal, setNameWorkoutModal] = useState(false);
  const [workoutPlanName, setWorkoutPlanName] = useState('');
  const [workoutPlanDescription, setWorkoutPlanDescription] = useState('');
  const [workoutImage, setWorkoutImage] = useState('');
  const [openModal, setOpenModal] = useState('');

  const Navigate = useNavigate()
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


  const submitWorkout = () => {
    console.log('newworkout ', workouts)
    const workoutData = {
      user_id: userData[0].id,
      user_name: userData[0].user_name,
      name:`${userData[0].user_name} ${dateString}`,
      completed: true,
      workouts: workouts,
    }
    fetch('http://localhost:8080/workout', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(workoutData)
    })
      .then(res => res.json())
      .then(() => Navigate(`/user/${userData[0].user_name}`))
  }

  const addToWorkouts = (e) => {
    setSubmitWorkoutButton(true)
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
    const deleteSet = (workoutIndex, setIndex) => {
      setWorkouts(prevWorkouts => {
        const newWorkouts = [...prevWorkouts];
        newWorkouts[workoutIndex].sets.splice(setIndex, 1);
        return newWorkouts;
      });
    };

    return workout.sets.map((e, setIndex) => {
      return <Set key={setIndex} set={e} workout={workout} updateSet={updateSet} workoutIndex={workoutIndex} setIndex={setIndex} deleteSet={deleteSet} />
    });
  };

  const addSet = (index) => {
    setWorkouts(prevWorkouts => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[index].sets.push({
        reps: 0,
        weight: 0,
        distance: 0,
        completed: false
      });
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

  const handleCreateWorkout = (index) => {
    setOpenModal('default')
    console.log(workouts)
  }


  const List = () => {
    return exercises.map((e) => <Dropdown.Item key={e.exercise_id} onClick={() => addToWorkouts(e)}>{e.exercise_name}</Dropdown.Item>)
  }

  const Workout = () => {
    return workouts.map((e, index) => {
      return (
        <Card key={index} className="w-3/4">
          <div className="flex justify-between">
            <p>{e.exercise_name}</p>
            <Button onClick={() => handleDeleteExercise(index)} color="failure" className="w-fit" alt="Delete this Exercise and Sets">Delete</Button>
          </div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>
                View Sets
              </Accordion.Title>
              <Accordion.Content>
                {e.sets.length > 0 && (
                  <Sets workout={e} setWorkouts={setWorkouts} workoutIndex={index} />
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

  const postWorkoutPlan = (data) => {
    const recipe = {}
    recipe.name = workoutPlanName
    recipe.description = workoutPlanDescription
    recipe.image = workoutImage
    recipe.workouts = []

    workouts.forEach((workout => {
      recipe.workouts.push(workout)
        console.log('Exercise name: ',workout.exercise_name)
        workout.sets.forEach((set) => {
          console.log('Sets: ', set.reps)
          console.log('Weight: ', set.weight)
          console.log('Distance: ', set.distance)
          console.log('Is Completed: ', set.completed)

        })



  // {
    //   "recipe": {
    //     "name": "Hulk",
    //       "description": "Be strong like Hulk, crush gods",
    //         "image": "https://i.etsystatic.com/36935296/r/il/270953/4827405475/il_794xN.4827405475_t7hn.jpg",
    //           "workouts": [
    //             {
    //               "name": "Hulk Chest",
    //               "activity": [
    //                 {
    //                   "exercise_id": 1,
    //                   "sets": [
    //                     {
    //                       "reps": 10
    //                     },
    //                     {
    //                       "reps": 10
    //                     },
    //                     {
    //                       "reps": 10
    //                     }
    //                   ]
    //                 }
    //               ]
    //             }
    //           ]
    //   }
    // }
      
    }))
    console.log(recipe)
  }

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-center gap-10">
        <Dropdown id='exercise' label="Add Exercise">
          <Dropdown.Header>
            <span className="block text-sm">
              Select Exercise
            </span>
          </Dropdown.Header>
          <List alt="exercise list" />
        </Dropdown>
        <Button disabled={!submitWorkoutButton} onClick={() => submitWorkout()}>Submit Workout</Button>
        {/* louis */}
        {submitWorkoutButton ? <Button onClick={() => handleCreateWorkout()} className="w-fit" alt="Delete this Exercise and Sets">Save As Workout Template</Button> : ''}
        {/* /louis  */}
      </div>
      <div className="flex flex-col items-center mt-10 gap-5">
        {workouts.length > 0 && (
          <Workout />
        )}
      </div>

      <div id='saveWorkoutModal'>
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} className=''>
          <ModalHeader>New Workout:</ModalHeader>
          <ModalBody>
          <TextInput
          className='mb-3'
            id="workoutPlanName"
            value={workoutPlanName}
            onChange={(e) => setWorkoutPlanName(e.target.value)}
            placeholder="Workout Name"
            type="text"
            required
          ></TextInput>
          <Textarea
            className='mb-3 text-sm'
            id="workoutPlanDesc"
            value={workoutPlanDescription}
            onChange={(e) => setWorkoutPlanDescription(e.target.value)}
            placeholder="Description"
            type="text"
            required
          ></Textarea>
          <Textarea
            className='mb-3 text-sm'
            id="workoutPlanImg"
            value={workoutImage}
            onChange={(e) => setWorkoutImage(e.target.value)}
            placeholder="Image Link (Optional)"
            type="text"
          ></Textarea>
          <Button onClick={() => postWorkoutPlan()} className="w-fit " >Submit</Button>
          </ModalBody>
        </Modal>
      </div>

    </div>

  )
}






