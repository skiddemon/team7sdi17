import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function UserPageMain({userData, exercises}){

  const Navigate = useNavigate();

  const ExerciseDropdownItems = () => {
    return exercises.map((e) => {
      return <Dropdown.Item key={e.id} onClick={()=>{}}>{e.exercise}</Dropdown.Item>
    });
  };

  if(userData.length < 1 || exercises.length < 1){
    return <p>Loading....</p>
  }

  return (
    <div className="text-red-500g">

      <div className='w-full h-4/5 bg-green-200'>
        <h1>RECORD NEW WORKOUT</h1>
        <Exercise exercises={exercises} />
        <div alt='selected exercise' className='w-full'>
          {/* to do app flavor  */}
        </div>
        <div alt='selected exercises' className='w-full'>
          <h1>THESE ARE THE RECORDED EXERCISES</h1>
          {/* to do app flavor  */}
        </div>
      </div>
      <footer className='w-full h-20 bg-indigo-200'>
        <h1>footer</h1>
      </footer>
    </div>
  )
} 
