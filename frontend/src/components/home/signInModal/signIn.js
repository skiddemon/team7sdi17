import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const SignIn = ({ setIsSignInModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authFail, setAuthFail] = useState(false);
  const Navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json()
      )
      .then(data => {
        if (data.token) {
          let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
          Cookies.set('token', data.token, {expires: inFifteenMinutes})
          Navigate(`/user/${data.user_name}`)
        } else {
          setAuthFail(true)
        }
      })
  }

  return (
    <div className="flex justify-center items-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
      <Card className="flex flex-col items-center h-fit w-80">
        <div className="flex">
          <h1 className="flex w-full justify-center">Sign In</h1>
          <p className="cursor-pointer" onClick={() => setIsSignInModal(false)}>X</p>
        </div>
        {authFail && (<p className="text-center text-red-500">Failed to Authenticate!</p>)}
        <form onSubmit={handleSignIn}>
          <div className="mb-6">
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Button>
          </div>
        </form>
      </Card>
   
    </div>
  )
}

export default SignIn;
