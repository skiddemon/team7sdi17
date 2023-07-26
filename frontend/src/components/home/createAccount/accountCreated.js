import {Button, Card} from 'flowbite-react'
export default function AccountCreated({setIsCreatedModal, setIsSignInModal}){
  return(
  <div className="flex justify-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
    <Card className="flex flex-col mt-40 items-center h-fit w-fit">
      <h1>Account Has Been Created</h1>
      <Button onClick={() => setIsCreatedModal(false)}>Close Window</Button>
      <Button onClick={() => {setIsSignInModal(true); setIsCreatedModal(false)}}>Sign-In</Button>
    </Card>
  </div>
  )
}