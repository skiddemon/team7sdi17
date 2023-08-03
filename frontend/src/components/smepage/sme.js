import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function SMEPage() {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')


    function handleSearch() {

    }

    return (
        <div className="mt-10">
            <Card className='w-3/6 mx-auto'>

            <Card className="w-fit mx-auto border-[red]">
                <h1 className='text-center'>As a trainer, I want to be able to create verified workouts</h1>
            </Card>

            {/* 
            Create Workout button should bring users to a create workout page, probably with a conditionally rendered trainer header or something.
            URL maybe should be the same as the general user's createworkout page but maybe with a /createworkout#verified
            */}
            <button className="flex focus:outline-none m-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Create Workout</button>

            <Card className='w-fit mx-auto  border-[red]'>
                <h1 className='text-center'>As a trainer, I want to verify workouts created by general users.</h1>
            </Card>
            <div className='flex mx-auto space-x-10'>
                <button className="flex focus:outline-none m-auto w-50 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">View Requests</button>
                <button className="flex focus:outline-none m-auto w-50 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Browse User Workouts</button>
            </div>
            
            <Card className='w-fit mx-auto  border-[red]'>
                <h1 className='text-center'>As a trainer, I want to see workout metrics of military members assigned to my installation/unit.</h1>
            </Card>

            <Card className='w-fit mx-auto  border-[red]'>
                <h1 className='text-center'>As a trainer, I want to list my areas of expertice in sports medicine in order to review and give a seal of approval that this routine is beneficial and others should check it out.</h1>
            </Card>
            </Card>
        </div>

    )
}