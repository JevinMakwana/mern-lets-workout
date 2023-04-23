import React, { useEffect } from 'react'
import { exerciseOptions, fetchData } from '../utils/fetchData';
import axios from 'axios';
import ExerciseCard from '../components/ExerciseCard';
import { Stack } from '@mui/material';



const SavedExercises = async () => {
  let searchedExercises = [];
      const onLoadFun = async () => {
        const userId = window.localStorage.getItem('userId');
        const savedExIds = await axios.get(`http://localhost:3001/myExercises/savedExercises/${userId}`);
        const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        savedExIds.data.forEach((idEx) => searchedExercises.push(exerciseData.filter((exercise) => exercise.id.includes(idEx))));
      }
    

  return ( 
    <Stack onLoad={onLoadFun()}>
      
        {searchedExercises?.map((item, index) => (
            <ExerciseCard exercise={item} key={index}/>
        ))}
    </Stack>
  )
}

export default SavedExercises