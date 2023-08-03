import {Button, Card, Table} from 'flowbite-react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'




export default function History(){
    const [userHistory, setUserHistory] = useState([])
    const userid = Cookies.get('userId')
    const token = Cookies.get('token')
    const Navigate = useNavigate();

//     useEffect((e) => {
//         fetch(`http://localhost:8080/workout/history/${userid}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//     }
// })
// .then(res => res.json())
// .then(data => { setUserHistory(data)})
// }, [])
// //   "name":"old_git_chest","workout_date":"2023-07-30T07:00:00.000Z","activity":[{"exercise_name":"Bench Press","sets":[{"reps":10,"weight":100,"distance":null}]}]}
// // let exercise_name = userHistory[i].activity[0].exercise_name;
// console.log('OUTSIDE USEEFFECT',userHistory)

// function loopThroughHistory(userHistory) {
//     let tableBody = "";
//     for (let i = 0; i < userHistory.length; i++) {
//         let date = new Date(userHistory[i].workout_date).toLocaleDateString();
//         let exercise_name = userHistory[i].activity[0].exercise_name;
//         let sets = "";
//         for (let j = 0; j < userHistory[i].activity[0].sets.length; j++) {
//             let weight = userHistory[i].activity[0].sets[j].weight;
//             let reps = userHistory[i].activity[0].sets[j].reps;
//             sets += `${weight} x ${reps}, `;
//         }
//         sets = sets.slice(0, -2);
//         tableBody += `
//             <Table.Body className="divide-y">
//             <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                 ${userHistory[i].ID}
//                 </Table.Cell>
//                 <Table.Cell>
//                 ${date}
//                 </Table.Cell>
//                 <Table.Cell>
//                 ${exercise_name}
//                 </Table.Cell>
//                 <Table.Cell>
//                 ${sets}
//                 </Table.Cell>
//             </Table.Row>
//             </Table.Body>
//         `;
//         }
//         return tableBody;
//     }


// {name: 'Bench Press', exercise_category_id: 1},
// {name: 'Pull Ups', exercise_category_id: 1},
// {name: 'Lateral Raises', exercise_category_id: 1},
// {name: 'Squats', exercise_category_id: 1},
// {name: 'Deadlifts', exercise_category_id: 1},
// {name: 'Arnold Presses', exercise_category_id: 1},
// {name: 'Calf Raises', exercise_category_id: 1},
// {name: 'Skull Crushers', exercise_category_id: 1},
// {name: 'Barbell Curls', exercise_category_id: 1},
// {name: 'Tricep Extensions', exercise_category_id: 1},
// {name: 'Weighted Dips', exercise_category_id: 1},
// {name: 'running', exercise_category_id: 2},
// {name: 'treadmill', exercise_category_id: 2},
// {name: 'Push-ups', exercise_category_id: 3},
// {name: 'Box Jumps', exercise_category_id: 3}


// push ups, 4 July 2023, 500, 5 
// Bench Press, 4 July 2023, 500, 5 
// Bench Press, 4 July 2023, 500, 5 
// Bench Press, 4 July 2023, 500, 5 
// Squats, 4 July 2023, 500, 5 
// Squats, 4 July 2023, 500, 5 
// Squats, 4 July 2023, 500, 5 
// Running, 8 July 2023, 0, 0, 100 
// Barbell Curls, 4 July 2023, 500, 5 
// Barbell Curls, 4 July 2023, 500, 5 
// Barbell Curls, 4 July 2023, 500, 5 
// push ups, 4 July 2023, 500, 5 
// push ups, 4 July 2023, 500, 5 
// push ups, 4 July 2023, 500, 5 
// push ups, 4 July 2023, 500, 5 
// {userHistory.length === 0 ? <h1>Loading...</h1> :
    return (
    <>
    
        <div alt="Workout History" className='my-8 m-auto w-full'>
            <Table>
            <Table.Head>
                <Table.HeadCell>
                    EXERCISE
                </Table.HeadCell>
                <Table.HeadCell>    
                    DATE
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

                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    </Table.Cell><Table.Cell>Sliver</Table.Cell><Table.Cell>Laptop</Table.Cell><Table.Cell>$2999</Table.Cell><Table.Cell>
                </Table.Cell>
                </Table.Row>

                
            </Table.Body>
            </Table>
        </div>
    </>
)
}