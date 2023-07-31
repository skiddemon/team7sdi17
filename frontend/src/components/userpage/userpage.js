import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect, Children } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function UserPageMain({ userData, exercises }) {
  const [exercisesToLog, setExercisesToLog] = useState([{}]);

  const handleAddExercise = () => {
    setExercisesToLog((prevState) => [...prevState, {}]);
  }

  const handleLogWorkout = () => {
    //getUserId
    const user_id = 1;
    //iterate through exercisesToLog and do a post request for each object
    exercisesToLog.forEach(async (e) => {
      const response = await fetch('http://localhost:8080/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id:user_id, ...e})
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
    })
  }

  const Navigate = useNavigate();

  if (userData.length < 1 || exercises.length < 1) {
    return <p>Loading....</p>
  }


  const renderExerciseComponents = () => {
    return exercisesToLog.map((e, index) => <Exercise key={index} exercises={exercises} index={index} exercisesToLog={exercisesToLog} setExercisesToLog={setExercisesToLog}/>)
  }

  return (
    <div className="text-red-500g">
      <div className='recordNewWorkoutContainer flex flex-column w-full h-4/5 justify-center bg-green-200 bg-opacity-25'>
        <div className='title flex h-120 w-2/4 text-8xl align-middle m-auto rounded-[15px]'>RECORD A NEW WORKOUT</div>

        
        <div alt='selected exercise' className='w-full'>
          {renderExerciseComponents()}
          <div className="addExerciseButtonContainer flex h-auto w-full p-4">
            <Button onClick={handleAddExercise} className="addExerciseButton flex h-120 w-15 text-8xl justify-center align-middle m-auto rounded-[15px] ease-in-out duration-200 hover:scale-150 hover:shadow-[4px_4px_10px_black]">+
            </Button>
          </div>
        </div>
        
      </div>
      <footer className='flex flex-row w-full h-20 bg-indigo-200 bg-opacity-25'>
        
        <Button onClick={handleLogWorkout} className='flex m-auto'>Log Workout</Button>
      </footer>
    </div>
  )
} 