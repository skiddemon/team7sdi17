import { Button, Card, Label, TextInput, Dropdown } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import EditUser from './edituser.js'
import UserEdited from './userEdited.js'

export default function AdminPage() {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    const [editUserModal, setEditUserModal] = useState(false)
    const [editedModal, setEditedModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true);
    const token = Cookies.get('token')

    const FoundUsers = () => {
        return foundUsers.map((user) => {
            return (
                <Card className="w-1/2">
                    <div className="flex justify-between items-center">
                    <div className="mb-6">
                        <Label htmlFor="lastname" value="Last Name" />
                        <p>{user.last_name}</p>
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="firstname" value="First Name" />
                        <p>{user.first_name}</p>
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="email" value="Email" />
                        <p>{user.email}</p>
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="role" value="Role" />
                        <p>{
                            user.role_id === 1
                                ? "Admin"
                                : user.role_id === 2
                                ? "User"
                                : "Trainer"
                              }
                        </p>
                    </div>
                    <Button onClick={() => {setSelectedUser(user); setEditUserModal(true)}}>Select</Button>
                    </div>
                </Card>
            )
        })
    }

    useEffect(() => {
        if (!isFirstRender && !editedModal) {
            try {
                const params = new URLSearchParams({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    user_name: userName,
                });

                fetch(`http://localhost:8080/users?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setFoundUsers(data)
                })
                .catch((err) => console.log(err))
            } catch (err) {
                console.log('Failed');
            }
        }
    }, [editedModal, isFirstRender]);

    function handleSearch(e) {
        e.preventDefault();
        setIsFirstRender(false);
    }

    return (
            <div className="mt-10 flex flex-col items-center gap-5">
                {editUserModal && (
                <EditUser selectedUser={selectedUser} setEditUserModal={setEditUserModal} setEditedModal={setEditedModal}/>
                )}
                {editedModal && (
                    <UserEdited setEditedModal={setEditedModal}/>
                )}
             <Card className="flex items-center w-fit">
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

                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            type="text"

                        />
                    </div>
                        <Button type="submit">Search</Button>
                </form>
                </Card>
                {foundUsers.length > 0 && (
                    <FoundUsers />
                )}
            </div>
    )
}
