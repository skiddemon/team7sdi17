import {Button, Card} from 'flowbite-react'
export default function UserEdited({setEditedModal}){
  return(
  <div className="flex justify-center z-50 fixed insert-0 w-full h-full bg-opacity-80 bg-zinc-200">
    <Card className="flex flex-col mt-40 items-center h-fit w-fit">
      <h1>Changes Submitted</h1>
      <Button onClick={() => {setEditedModal(false)}}>Close Window</Button>
    </Card>
  </div>
  )
}