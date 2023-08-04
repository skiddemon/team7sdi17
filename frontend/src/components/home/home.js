import { Card, Button } from 'flowbite-react'
import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import CreateAccount from './createAccountModal/createAccount.js'
import SignIn from './signInModal/signIn.js'
import AccountCreated from './createAccountModal/accountCreated.js'
import Logo from '../../images/logo2.png'


export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isCreatedModal, setIsCreatedModal] = useState(false)
  const Navigate = useNavigate();

  return (
    <div>
      {isOpenModal && (<CreateAccount setIsOpenModal={setIsOpenModal} setIsCreatedModal={setIsCreatedModal} />)}
      {isSignInModal && (<SignIn setIsSignInModal={setIsSignInModal} />)}
      {isCreatedModal && (<AccountCreated setIsCreatedModal={setIsCreatedModal} setIsSignInModal={setIsSignInModal} />)}
      <Card>
        <div className="flex items-center justify-between">
          <h1 className="w-fit text-2xl font-semibold cursor-pointer" onClick={() => Navigate('/')}><img src={Logo} alt="logo" width="50"/>Bits4Fits</h1>
          <div className="flex gap-10">
            <Button className="fit-content" onClick={() => setIsOpenModal(true)}>Create Account</Button>
            <Button className="fit-content" onClick={() => setIsSignInModal(true)}>Sign-In</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}