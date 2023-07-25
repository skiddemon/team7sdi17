import {Card, Button} from 'flowbite-react'
import React, {useState} from 'react'
import CreateAccount from './createAccount/createAccount.js'
import SignIn from './signIn/signIn.js'
export default function Header (){
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);

  return (
    <div>
      {isOpenModal && (<CreateAccount setIsOpenModal={setIsOpenModal} />)}
      {isSignInModal && (<SignIn setIsSignInModal={setIsSignInModal}/>)}

      <Card>
        <div className="flex items-center justify-between">
          <h1 className="w-fit">Final Project</h1>
          <div className="flex gap-10">
            <Button className="fit-content" onClick={() => setIsSignInModal(true)}>Sign-In</Button>
            <Button className="fit-content" onClick={() => setIsOpenModal(true)}>Create Account</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}