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

        const mapActivity = (activity) => {
            return activity.map((e) => {
                return e.sets.map((set, index) => {
                    return (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {e.exercise_name}
                            </Table.Cell>
                            <Table.Cell>
                                {set.reps}
                            </Table.Cell>
                            <Table.Cell>
                                {set.weight} lbs
                            </Table.Cell>
                            <Table.Cell>
                            {(set.distance === undefined || set.distance === null)? '0 km' : `${set.distance} km`}
                            </Table.Cell>
                        </Table.Row>
                    );
                });
            });
        };


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
        <div className="flex flex-col items-center justify-center m-10 mt-20 gap-5">
         <WorkoutCard />
        </div>
    )
}


