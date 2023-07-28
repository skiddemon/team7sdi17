import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate, useParams, Route, Routes } from 'react-router-dom'
import Exercise from '../exercise/exercise'

export default function AdminPage({ adminMode, setAdminMode }) {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    

    function handleSearch() {

    }

    return (
            <div className="mt-10 flex justify-center">
             <Card className="flex items-center">
                <form onSubmit={handleSearch} className="flex gap-10 w-fit items-center">
                    <div className="mb-6">
                        <Label htmlFor="lastname" value="Last Name" />
                        <TextInput
                            id="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name (Required)"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="firstname" value="First Name" />
                        <TextInput
                            id="firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="username" value="User Name" />
                        <TextInput
                            id="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="User Name"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="email" value="email" />
                        <TextInput
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            type="text"
                            required
                        />
                    </div>
                        <Button>Search</Button>
                </form>
                </Card>
            </div>

    )
}