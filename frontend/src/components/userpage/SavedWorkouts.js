import { useEffect, useState } from "react"
import { Card, Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import NewWorkout from "./newworkout"



export default function SavedWorkouts ({setSelectedWorkout}) {
    const Navigate = useNavigate()

const [workoutList, setWorkoutList] = useState([])
const userid = Cookies.get('userId')

useEffect(() => {
    fetch(`http://localhost:8080/workoutplan/${userid}`)
    .then(res => res.json())
    .then(data => {console.log(data); setWorkoutList(data)})

}, [])

const WorkoutMapper = () => {
    const activitiesMapper = (activity) => {
        console.log(activity)
        return activity.map( (e) => {
            return e.sets.length < 2 ? <p>{`${e.exercise_name}:  ${e.sets.length} Set`}</p> : <p>{`${e.exercise_name}:  ${e.sets.length} Sets`}</p>
        })
    }
    return workoutList.map((workout) => {
        return (
            <Card className="w-1/4" onClick={() => {setSelectedWorkout(workout); Navigate('../newWorkout')}}>
                {workout.name}
                {activitiesMapper(workout.activity)}
            </Card>
        )
    })
}

    return (
        <div className="flex justify-center mt-10">
            <WorkoutMapper />
        </div>

    )
}