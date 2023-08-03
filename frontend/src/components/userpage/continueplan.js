import {Card, Button} from 'flowbite-react'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


export default function ContinuePlan({setContPlan}){
  const [plans, setPlans] = useState([]);
  const userid = Cookies.get('userId');
  const token = Cookies.get('token')
  const Navigate = useNavigate()

  const PlanCard = () => {
    return plans.map((e, index) => {
      console.log(e)
      return (
        <Card key={index} className="w-2/4">
          <img src={e.image} alt={e.name} width={100} height={100}/>
          {e.name}
          {e.description}
          <Button onClick={() => {setContPlan(e.id); Navigate('newWorkout')}}>Continue Plan</Button>
        </Card>
      )
    })
  }

  useEffect(() => {
    fetch(`http://localhost:8080/plans/${userid}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
  .then(res => res.json())
  .then(data => {console.log(data); setPlans(data)})
  }, [])

  return (
    <div className="flex flex-col gap-10 items-center">
      <PlanCard />
    </div>
  )
}