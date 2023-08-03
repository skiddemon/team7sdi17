import {Button, Card, Table} from 'flowbite-react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'




export default function History(){
    const [userHistory, setUserHistory] = useState([])
    const userid = Cookies.get('userId')
    const token = Cookies.get('token')
    const Navigate = useNavigate();

    useEffect((e) => {
        fetch(`http://localhost:8080/workout/history/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => { setUserHistory(data)})
}, [])
//   "name":"old_git_chest","workout_date":"2023-07-30T07:00:00.000Z","activity":[{"exercise_name":"Bench Press","sets":[{"reps":10,"weight":100,"distance":null}]}]}
// let exercise_name = userHistory[i].activity[0].exercise_name;
console.log('OUTSIDE USEEFFECT',userHistory)

function loopThroughHistory(userHistory) {
    let tableBody = "";
    for (let i = 0; i < userHistory.length; i++) {
        let date = new Date(userHistory[i].workout_date).toLocaleDateString();
        let exercise_name = userHistory[i].activity[0].exercise_name;
        let sets = "";
        for (let j = 0; j < userHistory[i].activity[0].sets.length; j++) {
            let weight = userHistory[i].activity[0].sets[j].weight;
            let reps = userHistory[i].activity[0].sets[j].reps;
            sets += `${weight} x ${reps}, `;
        }
        sets = sets.slice(0, -2);
        tableBody += `
            <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                ${userHistory[i].ID}
                </Table.Cell>
                <Table.Cell>
                ${date}
                </Table.Cell>
                <Table.Cell>
                ${exercise_name}
                </Table.Cell>
                <Table.Cell>
                ${sets}
                </Table.Cell>
            </Table.Row>
            </Table.Body>
        `;
        }
        return tableBody;
    }

    return (
    <>
    {userHistory.length === 0 ? <Button>asdfasdf</Button> : 
        <div alt="Workout History" className='my-8 m-auto w-full'>
            <Table>
            <Table.Head>
                <Table.HeadCell>
                WOrkout Name
                </Table.HeadCell>
                <Table.HeadCell>    
                Exercise
                </Table.HeadCell>
                <Table.HeadCell>
                
                </Table.HeadCell>
                <Table.HeadCell>
                Price
                </Table.HeadCell>
                <Table.HeadCell>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <p>{userHistory[0].ID} </p>
                </Table.Cell>
                <Table.Cell>
                    Sliver
                </Table.Cell>
                <Table.Cell>
                    Laptop
                </Table.Cell>
                <Table.Cell>
                    $2999
                </Table.Cell>
                <Table.Cell>
                    <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    >
                    </a>
                </Table.Cell>
                </Table.Row>
                
            </Table.Body>
            </Table>
        </div>}
    </>
)
}