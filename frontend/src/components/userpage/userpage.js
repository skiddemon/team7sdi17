import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function UserPageMain({ userData, exercises }) {
  const [exercisesToLog, setExercisesToLog] = useState([{}]);

  const handleAddExercise = () => {
    setExercisesToLog((prevState) => [...prevState, {}]);
  }

  const Navigate = useNavigate();

  const ExerciseDropdownItems = () => {
    return exercises.map((e) => {
      return <Dropdown.Item key={e.id} onClick={() => { }}>{e.exercise}</Dropdown.Item>
    });
  };

  if (userData.length < 1 || exercises.length < 1) {
    return <p>Loading....</p>
  }


  const renderExerciseComponents = () => {
    let exerciseCount = 1;
    return exercisesToLog.map((e) => <Exercise key={exerciseCount++} exercises={exercises} />)
  }

  return (
    <div className="text-red-500g">
      <div className='w-full h-4/5 bg-green-200'>
        <h1>RECORD NEW WORKOUT</h1>
        <div alt='selected exercise' className='w-full'>
          {renderExerciseComponents()}
          <div className="addExerciseButtonContainer flex h-auto w-full p-4">
            <Button onClick={handleAddExercise} className="addExerciseButton flex h-120 w-15 text-6xl justify-center align-middle shadow-[4px_4px_10px_black] bg-[white] m-auto rounded-[15px] ease-in-out">+
            </Button>
          </div>
        </div>

        <div alt='selected exercises' className='w-full'>
          <h1>THESE ARE THE SELECTED EXERCISES</h1>
        </div>

      </div>

      <footer className='w-full h-20 bg-indigo-200'>
        <h1>footer</h1>
      </footer>
    </div>
  )
} 