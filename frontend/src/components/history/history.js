import {Button, Card, Table} from 'flowbite-react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'




export default function History(){
    const [userHistory, setUserHistory] = useState([])
    const userid = Cookies.get('userId')
    const token = Cookies.get('token')
    const Navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/workout/history/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data);setUserHistory(data)})
    }, [])

    const WorkoutCard = () => {
        const mapSets = (sets, category) => {
            return sets.map((e, index) => {
                return (
                    <div>
                    {(category === 1 || category === 3) ? <p>{`Set ${index +1}: ${e.reps} Reps @ ${e.weight} lbs`}</p> : <p>{`Set ${index + 1}: ${e.distance} km`}</p>}
                    </div>
                )
            })
        }

        const mapActivity = (activity) => {
            return activity.map((e, index) => {
                return (
                    <div>
                        <p>{e.exercise_name}</p>
                        {mapSets(e.sets, e.category_id)}
                    </div>

                )
            })
        }

       return userHistory.map((e, index) => {
            console.log(e)
           return( <Card>
                <p>{`Exercise Name: ${e.name}`}</p>
                {mapActivity(e.activity)}
                </Card>
           )
        } )
    }

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 m-10 gap-5">
         <WorkoutCard />
        </div>
    )
}