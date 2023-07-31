import {Button, Card, Label, TextInput, Dropdown} from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

export default function EditUser({selectedUser, setEditUserModal, setEditedModal}){
  const [firstName, setFirstName] = useState(selectedUser.first_name)
  const [lastName, setLastName] = useState(selectedUser.last_name)
  const [email, setEmail] = useState(selectedUser.email)
  const [userId, setUserId] = useState(selectedUser.id)
  const [role, setRole] = useState(selectedUser.role_id)
  const [rolesList, setRolesList] = useState([])
  const token = Cookies.get('token')


  const submitEdits = () => {

    let userToEdit = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role_id: role
    }

    fetch(`http://localhost:8080/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userToEdit)

    })
    .then(res => res.json())
    .then(data => {setEditedModal(true); setEditUserModal(false)})
  }

  const deleteUser = () => {
    fetch(`http://localhost:8080/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(() => {
        setEditedModal(true);
        setEditUserModal(false);
    })
    .catch(err => console.log(err));
}


  useEffect(() => {
    fetch(`http://localhost:8080/roles`)
    .then(res  => res.json())
    .then(data => {console.log(data); setRolesList(data)})
  }, [])

  const List = () => {
    return rolesList.map((e) => <Dropdown.Item key={e.id} onClick={() => {setRole(e.id)}}>{e.role}</Dropdown.Item>)
  }

  return (
    <div className="flex justify-center items-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
    <Card>
      <div className="flex">
        <p className="w-full text-center">Edit User</p>
        <p className="cursor-pointer" onClick={() => setEditUserModal(false)}>X</p>
      </div>
      <form>
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
          <Label htmlFor="email" value="Email" />
          <TextInput
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              required
          />
        </div>
        <div className="mb-10">
          <Label htmlFor="role" value="Role"/>
          <Dropdown id="role" label={
                        role === 1
                          ? "Admin"
                          : role === 2
                          ? "User"
                          : "Trainer"
                        }>
            <Dropdown.Header>
              <span className="block text-sm">
                Select Role
              </span>
            </Dropdown.Header>
              <List  alt="role list" />
          </Dropdown>
        </div>
        <div className="flex gap-5 justify-center">
          <Button onClick = {() => submitEdits()}>Submit</Button>
          <Button color="failure" onClick={() => deleteUser()}>Delete User</Button>
        </div>
      </form>
    </Card>
    </div>
  )
}