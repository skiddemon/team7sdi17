import {Button, Card, Label, TextInput, Dropdown} from 'flowbite-react';
import {useState, useEffect} from 'react';

export default function CreateAccount({setIsOpenModal}){
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [branch, setBranch] = useState('Branch')
  const [base, setBase] = useState('Base')
  const [password, setPassword] = useState('')
  const [bases, setBases] = useState([])
  const [branches, setBranches] = useState([])

  const List = ({element, set}) => {
    return element.map((e) => <Dropdown.Item onClick={() => set(e.name)}>{e.name}</Dropdown.Item>)
  }

useEffect(() => {
    Promise.all([
        fetch('http://localhost:8080/bases')
            .then(res => res.json())
            .then(data => setBases(data)),
        fetch('http://localhost:8080/branches')
            .then(res => res.json())
            .then(data => setBranches(data))
    ])
    .catch(error => console.log(error));
}, [])
  return (
    <div className="flex justify-center items-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
      <Card className="flex flex-col items-center h-fit w-80">
        <div className="flex">
          <h1 className="flex w-full justify-center">Create Account</h1>
          <p className="cursor-pointer" onClick={() => setIsOpenModal(false)}>X</p>
        </div>
        <form>
          <div class="mb-6">
            <Label htmlFor="first_name" value="First Name" />
            <TextInput
              id="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              type="text"
              alt= "first name input"
              required
              />
          </div>
          <div class="mb-6">
            <Label htmlFor="last_name" value="last Name" />
            <TextInput
              id="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              type="text"
              alt= "last name input"
              required
              />
          </div>
          <div class="mb-6">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              alt= "email input"
              required
              />
          </div>
          <div class="mb-6">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="text"
              alt= "password input"
              required
              />
            </div>
          <div class="mb-6">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="text"
              alt= "second password input"
              required
              />
          </div>
          <div className="flex flex-col items-center w-full">
            <div id="dropdownSearch" className="mb-5">
              <Dropdown label={branch} alt= "branch dropdown">
                <Dropdown.Header>
                  <span className="block text-sm">
                    Select Branch
                  </span>
                </Dropdown.Header>
                <List element={branches} set={setBranch} alt="branch list"/>
              </Dropdown>
            </div>
            <div class="mb-6">
              <Dropdown label={base} alt= "base dropdown">
                <Dropdown.Header>
                  <span className="block text-sm">
                    Select Base
                  </span>
                </Dropdown.Header>
                <List element={bases} set={setBase} alt="base list"/>
              </Dropdown>
            </div>
          </div>
          <div className="flex justify-center">
          <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" alt= "submit create account">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}