import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes, Router } from 'react-router-dom'
import Exercise from '../exercise/exercise'
import UserPageMain from './userpage';
import AdminPage from '../adminpage/adminpage';

export default function UserPage() {

    const [exercises, setExercises] = useState([]);
    const [userData, setUserData] = useState([]);
    const [adminMode, setAdminMode] = useState(false);

    const Navigate = useNavigate()
    const token = Cookies.get('token')
    const user = useParams().username


    const getExercises = () => {
        try {
            fetch('http://localhost:8080/exercises', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => { setExercises(data) })
                .catch((err) => console.log(err))
        } catch (err) {
            console.log('Failed')
        }
    }

    useEffect(() => {
        if (!token) {
            Navigate('/')
        } else {
            try {
                fetch(`http://localhost:8080/user/${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            console.log('if(!res.ok)')
                            Navigate('/')
                        } else {
                            return res.json()
                        }
                    })
                    .then(data => {
                        setUserData(data)
                        console.log(data)
                        getExercises();
                    })
            } catch (err) {
                console.error('Failed to fetch')
            }
        }
    }, [token, user])


    if (userData.length < 1 || exercises.length < 1) {
        return <p>Loading....</p>
    }
    return (
        <>
            <header className='w-full h-20 bg-yellow-100'>
                <Card>
                    <div className="flex items-center justify-between">
                        <h1 className="w-fit">Final Project</h1>
                        <div className="flex gap-10">
                            <Button className="w-40" onClick={() => { Cookies.remove('token'); Navigate('/') }}>Sign Out</Button>
                            {userData[0].role_id == 1
                                ?
                                (adminMode
                                    ?
                                    <Button className="w-40" onClick={() => { setAdminMode(false); Navigate(`/user/${userData[0].user_name}`) }}>Home</Button>
                                    :
                                    <Button className="w-40" onClick={() => { setAdminMode(true); Navigate('adminTools') }}>Admin Tools</Button>)
                                :
                                <Button className="w-40" onClick={() => { Navigate(`/user/${userData[0].user_name}`) }}>Home</Button>
                            }
                        </div>
                    </div>
                </Card>
            </header>
            <Routes>
                <Route path='/' element={<UserPageMain userData={userData} exercises={exercises} />} />
                <Route path='adminTools' element={<AdminPage />} />
            </Routes>
        </>
    )
}


    //Drop Down w/ Exercises
    //Conditionally Render Fields on Type of Exercise: strength (weight/reps) or cardio (distance/reps)
    //"+" button to add this to the set of exercises (i.e. workout) I accomplished
    //"X" button to remove exercise from set of exercises I accomplished
    //"Log" button to log workout to DB

    // need to make a dt exercise_categories, one category can have many exercises, ((migrate:make))
    // need to alter dt exercises to include exercise_categories forign key, ((modify the 20230726210551_exercises migration file))
    // make seed exercise_categories with the three categories we talked about, plyometric, cardio, strength, ((npx knex seed:06-exercise_categories))
    // modify dt exercises seed to include the field for exercise_categories foriegn key, and modify dropforign key before drop table (())
    // rollback, then migrate latest, seed run



    //TODO: Apply token check to the following useEffect:

    // useEffect(() => {
    //     fetch('http://localhost:8080/exercises')
    //     .then((res)=>res.json())
    //     .then((data)=>setExercises(data))
    //     .catch((err)=>console.log(err))
    // }, [])
