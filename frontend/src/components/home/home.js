import { Card, Button } from 'flowbite-react'
import React, { useState } from 'react'
import CreateAccount from './createAccountModal/createAccount.js'
import SignIn from './signInModal/signIn.js'
import AccountCreated from './createAccountModal/accountCreated.js'


export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isCreatedModal, setIsCreatedModal] = useState(false)

  return (
    <div>
      {isOpenModal && (<CreateAccount setIsOpenModal={setIsOpenModal} setIsCreatedModal={setIsCreatedModal} />)}
      {isSignInModal && (<SignIn setIsSignInModal={setIsSignInModal} />)}
      {isCreatedModal && (<AccountCreated setIsCreatedModal={setIsCreatedModal} setIsSignInModal={setIsSignInModal} />)}
      <Card>
        <div className="flex items-center justify-between">
          <img src="logo.svg" />
          <h1 className="w-fit">Final Project</h1>
          
          <div className="flex gap-10">
            <Button className="fit-content" onClick={() => setIsOpenModal(true)}>Create Account</Button>
            <Button className="fit-content" onClick={() => setIsSignInModal(true)}>Sign-In</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}