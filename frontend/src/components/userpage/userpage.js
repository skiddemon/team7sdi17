import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect, Children } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import DataView from './dataview.js'
import ContinuePlan from './continueplan.js'
import history from '../history/history.js'

export default function UserPageMain({ userData, exercises, setContPlan}) {
  const Navigate = useNavigate()

  if (userData.length < 1 || exercises.length < 1) {
    return <p>Loading....</p>
  }

  return (
    <div>
      <div className="flex mt-10 gap-10 justify-center">
        <Button className="w-40" onClick={() => Navigate('newWorkout')}>New Workout</Button>
        <Button className="w-40" onClick={() => Navigate('history')}>Workout History</Button>
        <Button className="w-40" onClick={() => Navigate('findPlan')}>Find Plan</Button>
      </div>
      <div className="mt-10 grid grid-cols-2">
        <div>
        <DataView />
        </div>
        <div className="">
        <ContinuePlan setContPlan={setContPlan}/>
        </div>

      </div>
    </div>
  )
}