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
            let repCount = 0;
            let weightMoved = 0;
            sets.forEach((e, index) => {
                repCount += e.reps;
                weightMoved += e.weight;

                // return (
                //     <div>
                //     {(category === 1 || category === 3) ? <p>{`Set ${index +1}: ${e.reps} Reps @ ${e.weight} lbs`}</p> : <p>{`Set ${index + 1}: ${e.distance} km`}</p>}
                //     {}
                //     </div>
                // )
            })
           return(
             <p>{repCount} {weightMoved}</p>
           )
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


{/* <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    {e.name}
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div> */}