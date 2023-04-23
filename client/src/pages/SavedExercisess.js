import React, { useEffect } from 'react'
import ExerciseCard from '../components/ExerciseCard.js';
import axios from 'axios';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { Stack } from '@mui/material';


const SavedExercisess = () => {
  const [searchedExercises, setSearchedExercises] = React.useState([]);

  useEffect(() => {
    const onLoadFun = async () => {
      const userId = window.localStorage.getItem('userId');
      const savedExIds = await axios.get(`http://localhost:3001/myExercises/savedExercises/${userId}`);
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      let exercises = [];
      savedExIds.data.forEach((idEx) => {
        exercises.push(
          exerciseData.filter((exercise) => exercise.id.includes(idEx))
            .flat()
        );
      });
      setSearchedExercises(exercises);
    }
    onLoadFun();
  }, []);
  
  return (
    <div>
      <Stack 
        direction='row' 
        marginTop='40px'
        sx={{gap: {lg:'110px', sx:'50px'}}}
        flexWrap='wrap'
        justifyContent='center'
      >
        {searchedExercises.map((exercise) => {
          return <ExerciseCard key={exercise[0].gifUrl} exercise={exercise[0]} />
        })}
      </Stack>
    </div>
  )
}

export default SavedExercisess;
