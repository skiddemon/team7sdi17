import {Button, Card, Label, TextInput} from 'flowbite-react';
import {useState} from 'react';

const SignIn = ({setIsSignInModal}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    alert(`username: ${username}, password: ${password}`);
  }

  return (
    <div className="flex justify-center items-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
      <Card className="flex flex-col items-center h-fit w-80">
        <div className="flex">
          <h1 className="flex w-full justify-center">Sign In</h1>
          <p className="cursor-pointer" onClick={() => setIsSignInModal(false)}>X</p>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-6">
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="email"
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
