import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect, Children } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function UserPageMain({ userData, exercises }) {
  const Navigate = useNavigate()

  if (userData.length < 1 || exercises.length < 1) {
    return <p>Loading....</p>
  }

  return (
    <div>
      <div className="flex mt-10 gap-10 justify-center">
        <Button className="w-40" onClick={() => Navigate('newWorkout')}>New Workout</Button>
        <Button className="w-40">Wokout History</Button>
      </div>

    </div>
  )
}