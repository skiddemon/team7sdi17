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
        const mapSets = (sets) => {
            let repCount = 0;
            let weightMoved = 0;
            let totalDistance = 0
            sets.forEach((e, index) => {
                repCount += e.reps;
                weightMoved += e.weight;
                totalDistance += e.distance;
            })
           return(
            <>
             <Table.Cell>
                {repCount}
             </Table.Cell>
             <Table.Cell>
                {weightMoved} lbs
             </Table.Cell>
             <Table.Cell>
                {totalDistance} km
             </Table.Cell>
             </>
           )
        }

        const mapActivity = (activity) => {
            return activity.map((e, index) => {
                return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {e.exercise_name}
                        </Table.Cell>
                        {mapSets(e.sets)}
                    </Table.Row>

                )
            })
        }

       return userHistory.map((e, index) => {
            console.log(e)
            const dateStr = "2023-08-03T06:00:00.000Z";
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString("en-CA");
           return(
            <div className="w-1/2">
            <Table>
            <Table.Head>
                    <Table.HeadCell>
                        Workout Name: {e.name}
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Workout Date: {formattedDate}
                    </Table.HeadCell>
                </Table.Head>
            </Table>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        EXERCISE
                    </Table.HeadCell>
                    <Table.HeadCell>
                        REPS
                    </Table.HeadCell>
                    <Table.HeadCell>
                        WEIGHT
                    </Table.HeadCell>
                    <Table.HeadCell>
                        DISTANCE
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {mapActivity(e.activity)}
                </Table.Body>
            </Table>
            </div>
           )
        } )
    }

    return (
        <div className="flex flex-col items-center justify-center mt-20 gap-5">
         <WorkoutCard />
        </div>
    )
}


