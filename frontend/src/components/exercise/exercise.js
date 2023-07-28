import {Dropdown, Label, TextInput} from 'flowbite-react';
import {useState} from 'react';

const Exercise = ({exercises}) => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [weight, setWeight] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [split, setSplit] = useState('');
    const [comment, setComment] = useState('');

    const exercise_dropdown_items = exercises.map((e)=>{
        return <Dropdown.Item key={e.id} onClick={()=>{setSelectedExercise(e);}}>{e.exercise_name}</Dropdown.Item>
    })

    return(
        <>
        
                <div class="exerciseCard flex flex-row justify-around h-20 w-11/12 align-middle min-w-[400px] align-middle bg-[gray] text-center shadow-[4px_4px_10px_black] m-2 p-[3px] rounded-[10px]">
                <Dropdown label={
                    selectedExercise ? selectedExercise?.exercise_name : 'Select an Exercise'
                } alt="Exercises" className='flex m-auto'>
                    <Dropdown.Header>
                        <span className="block text-sm">
                            Select Exercise
                        </span>
                    </Dropdown.Header>
                    {exercise_dropdown_items.length > 0 && exercise_dropdown_items}
                </Dropdown>
                
                {selectedExercise?.category_name === 'Strength' &&
                    <>
                        <Label htmlFor='weight' value='Weight' className='flex m-auto'/>
                        <TextInput 
                            id='weight'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder='0'
                            type='number'
                            alt='weight input'
                            className='flex m-auto'
                        />
                    </>
                }
                
                {selectedExercise?.category_name === 'Cardio' && 
                    <>
                        <Label htmlFor='distance' value='Distance' className='flex m-auto' />
                        <TextInput 
                            id='distance'
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder='0'
                            type='number'
                            alt='distance input'
                            className='flex m-auto'
                        />
                        <Label htmlFor='split' value='Split' className='flex m-auto' />
                        <TextInput
                            id='split'
                            value={split}
                            onChange={(e) => setSplit(e.target.value)}
                            placeholder='0'
                            type='number'
                            alt='split input'
                            className='flex m-auto'
                        />
                    </>
                }
                
                <Label htmlFor='sets' value='Sets' className='flex m-auto'/>
                <TextInput 
                    id='sets'
                    value={numSets}
                    onChange={(e) => setNumSets(e.target.value)}
                    placeholder='0'
                    type='number'
                    alt='sets input'
                    className='flex m-auto'
                />
                <Label htmlFor='reps' value='Reps' className='flex m-auto'/>
                <TextInput 
                    id='reps'
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder='0'
                    type='number'
                    alt='reps input'
                    className='flex m-auto'
                />
                <Label htmlFor='comment' value='Comment' className='flex m-auto' />
                <TextInput
                id='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='How did it go?'
                    type='text'
                    alt='Comment input'
                    className='flex m-auto'
                    />
                <button type="button" class="flex focus:outline-none m-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">EDIT</button>
                <button type="button" class="flex focus:outline-none m-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            </div>
           
        </>
    )
};

export default Exercise;
