import {Button, Card} from 'flowbite-react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import PlanPage from './planpage.js'
import Cookies from 'js-cookie'


export default function FindPlan(){
  const [plan, setPlan] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null);
  const token = Cookies.get('token')
  const Navigate = useNavigate();

  useEffect((e) => {
    fetch('http://localhost:8080/plans', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {console.log(data); setPlan(data)})
  }, [])

  const RenderPlans = () => {
    return plan.map((e) => {
      return (
        <Card className="cursor-pointer" key={e.id} onClick={() => {
          setSelectedPlan(e);
          Navigate(`${e.name}`)
        }}>
          <img src={e.image} alt={e.name} width={100} height={100}/>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e.name}</h5>
          <h5 className="text-lg text-gray-700 font-bold">Length: {`${e.workouts.length}`} Workouts</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{e.description}</p>
        </Card>
    )})
  }

  const FindPlanHome = () => {
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 m-10">
        {plan.length > 0 && <RenderPlans />}
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<FindPlanHome />}/>
      <Route path=':name' element={<PlanPage selectedPlan={selectedPlan}/>}/>
    </Routes>
  )
}

