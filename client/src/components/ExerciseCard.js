import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios';


const ExerciseCard = ({ exercise }) => {
    const saveExercise = async (exID) => {
        try{
            const response = await axios.put("http://localhost:3001/myExercises", {userId: window.localStorage.getItem("userId"), exID:exID});
        }catch(err){
            console.error('error from ErciseCard->saceExerciseee',err);
        }
    }
    return (

        <Link className='exercise-card' to={`/exercise/${exercise.id}`}>
            <img src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
            <Stack direction='row'>
                <Button sx={{ml:'21px', color:'#fff', background:'#ffa9a9', fontSize:'14px', borderRadius:'10px', textTransform:'capitalize'}}>
                    {exercise.bodyPart}
                </Button>
                <Button sx={{ml:'21px', color:'#fff', background:'#fcc757', fontSize:'14px', borderRadius:'10px', textTransform:'capitalize'}}>
                    {exercise.target}
                </Button>
                <Button onClick={() => saveExercise(exercise.id)} sx={{ml:'21px', color:'#fff', background:'#fcc757', fontSize:'14px', borderRadius:'10px', textTransform:'capitalize'}}>
                    save
                </Button>
            </Stack>
            <Typography ml='21px' color='#000' fontWeight='bold' mt='11px' pb='10px' textTransform='capitalize' fontSize='22px'>
                {exercise.name}
            </Typography>
        </Link>
    )
}

export default ExerciseCard
