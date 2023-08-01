import {Card, Button, Label, TextInput} from 'flowbite-react'
import { AiOutlineCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

import React, {useState} from 'react'

export default function Set({set, setIndex, workout, handleSetChange}){
  const [reps, setReps] = useState(set.reps)
  const [weight, setWeight] = useState(set.weight)
  const [distance, setDistance] = useState(set.distance)
  const [disabled, setDisabled] = useState(false)
  const [deletedItem, setDeletedItem] = useState([]);

  const updateSet = (e) => {
    const newSetValues = {reps: reps, weight: weight, distance: distance}
    handleSetChange(newSetValues)
    console.log('clicked the set state button - ' + newSetValues.reps)
  }

  const deleteSet = (setIndex) =>  {
    workout.sets.splice(setIndex,1)
    setDeletedItem(setIndex)
    //console.log ('workout set '  + workout.sets[setIndex].reps) 
  }

  return (
    <div alt="sets component">
      <form className="flex justify-between items-center" >
        <div>
          <Label value="Set"/>
          <p>{setIndex + 1}</p>
        </div>
        <div>
          <Label htmlFor='weight' value="Weight"/>
          <TextInput
            id="weight"
            name="weight"
            value={weight}
            placeholder="weight"
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            disabled={disabled}
          />
        </div>
        {workout.exercise_category_id === 1 && (
          <div>
            <Label htmlFor='reps' value="Reps"/>
            <TextInput
              id="reps"
              name="reps"
              value={reps}
              placeholder="reps"
              type="number"
              onChange={(e) => setReps(e.target.value)}
              disabled={disabled}
            />
          </div>
        )}
        {workout.exercise_category_id === 2 && (
          <div>
            <Label htmlFor='distance' value="Distance"/>
            <TextInput
              id="distance"
              name="distance"
              value={distance}
              placeholder="distance"
              type="number"
              onChange={(e) => setDistance(e.target.value)}
              disabled={disabled}
            />
          </div>
        )}
<div alt="set and delete"className="flex gap-10">
  {disabled ? (
    <AiFillEdit className="cursor-pointer" onClick={() => setDisabled(false)}/>
  ) : (
    <AiOutlineCheckCircle alt="This Click makes the numbers persistent" className="cursor-pointer" onClick={() => {setDisabled(true); updateSet()}}/>
  )}
  <AiFillDelete onClick={() => {deleteSet(setIndex)}} alt="Delete Individual Set" className="cursor-pointer"/>
</div>

      </form>
    </div>
  )

}

