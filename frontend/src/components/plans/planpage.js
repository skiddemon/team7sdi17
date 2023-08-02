import {Card, Button} from 'flowbite-react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

export default function PlanPage({selectedPlan}){
  const username = Cookies.get("user_name")
  const Navigate = useNavigate();
  const userId = Cookies.get("userId")

  const submitWorkout = () => {
    selectedPlan.workouts.forEach((e) => {
      console.log(selectedPlan)
      const workoutData = {
        user_id: userId,
        user_name: username,
        name: e.name,
        completed: false,
        recipe_id: selectedPlan.id,
        workouts: e.activity,
      }
      fetch('http://localhost:8080/workout', {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(workoutData)
      })
      .then(res => res.json())
      .then(() => Navigate(`/user/${username}`))
    })
  }

  const RenderSets = ({category, sets}) => {
    return sets.map((e, index)=>{
      return category !== 2 ? <li>Set {index + 1}: {e.reps} Reps</li> : <li>Sets: {sets.length} Distance: {e.distance}</li>
    })
  }

  const RenderActivities = ({activities}) => {
    return activities.map((e)=>{
      console.log(`sets: ${e.sets}`)
      return (
        <li>
          <div className="font-bold">
            {e.exercise_name}
          </div>
          <ol>
            <RenderSets category={e.category} sets={e.sets}/>
          </ol>
        </li>
      )
    })
  }

  const RenderWorkouts = () => {
    return selectedPlan.workouts.map((e)=>{
      console.log(e.activity)
      return (
        <Card>
          <h5 className="text-lg font-bold">{e.name}</h5>
          <ol>
            <RenderActivities activities={e.activity}/>
          </ol>
        </Card>
      )
    })
  }

  return(
    <div className="flex justify-center">
      <Card className="mt-10 w-3/4">
        <img src={selectedPlan.image} alt={selectedPlan.name} width={100} height={100}/>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{selectedPlan.name}</h5>
        <h5 className="text-lg text-gray-700 font-bold">Length: {selectedPlan.workouts.length} Workouts</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{selectedPlan.description}</p>
        <div className="flex justify-evenly mt-10 mb-5">
          <RenderWorkouts />
        </div>
        <div className="flex justify-evenly">
          <Button color="gray" onClick={()=>Navigate(`/user/${username}/findPlan`)}>Back</Button>
          <Button onClick={submitWorkout}>Select This Workout</Button>
        </div>
      </Card>
    </div>
  )
}