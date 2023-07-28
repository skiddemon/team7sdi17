import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function UserPageMain({userData, exercises}){

  const Navigate = useNavigate();

  const ExerciseDropdownItems = () => {
    return exercises.map((e) => {
      return <Dropdown.Item key={e.id} onClick={()=>{}}>{e.exercise}</Dropdown.Item>
    });
  };

  if(userData.length < 1 || exercises.length < 1){
    return <p>Loading....</p>
  }

// <<<<<<< KERBALbranch


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

//     return (
//         <div className="text-red-500g">
//             <header className='w-full h-20 bg-yellow-100'>
//                 <h1>header</h1>
//                 <Button onClick={() => {Cookies.remove('token'); Navigate('/')}}>Sign Out</Button>
//             </header>
//             <body className='w-full h-4/5 bg-green-200'>
//                 <h1>RECORD NEW WORKOUT</h1>
//                 <Exercise exercises={exercises}/>
//                 {/* ///////////////////////////// */}
//                 <div alt='selected exercise' className='w-full'>
//                     {/* to do app flavor  */}
//                 </div>
//                 <div alt='selected exercises' className='w-full'>
//                 <h1>THESE ARE THE RECORDED EXERCISES</h1>
//                     {/* to do app flavor  */}
//                 </div>

//             </body>
//             <footer className='w-full h-20 bg-indigo-200'>
//                 <h1>footer</h1>
//             </footer>
// =======
  return (
    <div className="text-red-500g">
      <header className='w-full h-20 bg-yellow-100'>
        <h1>header</h1>
        <div className="flex gap-10">
          <Button onClick={() => {Cookies.remove('token'); Navigate('/')}}>Sign Out</Button>
          {userData[0].role_id === 1 && (<Button onClick={() => Navigate('adminTools')}>Admin Page</Button>)}
        </div>
      </header>
      <body className='w-full h-4/5 bg-green-200'>
        <h1>RECORD NEW WORKOUT</h1>
        <Dropdown label="Exercises" alt="exercise-dropdown">
          <Dropdown.Header>
            <span className="block text-sm">
              Select Exercise
            </span>
          </Dropdown.Header>
          {exercises.length > 0 && <ExerciseDropdownItems />}
        </Dropdown>
        <div alt='selected exercise' className='w-full'>
          {/* to do app flavor  */}
        </div>
        <div alt='selected exercises' className='w-full'>
          <h1>THESE ARE THE RECORDED EXERCISES</h1>
          {/* to do app flavor  */}
// >>>>>>> main
        </div>
      </body>
      <footer className='w-full h-20 bg-indigo-200'>
        <h1>footer</h1>
      </footer>
    </div>
  )
} 
