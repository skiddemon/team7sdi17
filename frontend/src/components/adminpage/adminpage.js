import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function AdminPage() {

    console.log('admin page is working')

    return (
        <div>
            <h1>HELLO ADMIN</h1>
        </div>
    )
}