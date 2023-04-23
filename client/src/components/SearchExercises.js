import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';

import { exerciseOptions ,fetchData } from "../utils/fetchData.js"
import HorizontalScrollbar from './HorizontalScrollbar.js';


const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    }
    fetchExercisesData();
  }, [])

  

  const handleSearch = async () => {
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      const searchedExercises = exerciseData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search) 
          ||  exercise.target.toLowerCase().includes(search)
          ||  exercise.equipment.toLowerCase().includes(search)
          ||  exercise.bodyPart.toLowerCase().includes(search) 
      );
      console.log("searchedExercises===",searchedExercises);
      setSearch("");
      setExercises(searchedExercises);
    }

  }
  return (
    <Stack alignItems="center" mt="37px" p="20px" justifyContent="center" >
      <Typography id='scrollHere'  fontWeight={700} sx={{ fontSize:{ lg:"44px", xs:'30px' }}} mb="50px" textAlign="center">
        Awesome Exercises You <br/> Should Know 
      </Typography>
      <Box position="relative" mb="72px" >
        <TextField 
          sx={{
            input:{
              fontWeight:"700", 
              border:"none", 
              borderRadius:"4px"
            },
            width: { lg: '800px', xs:'350px' },
            backgroundColor:'#fff',
            borderRadius:'40px'
          }}
          height="76px" 
          value= {search}
          onChange={(e) => {setSearch(e.target.value.toLowerCase())}} 
          placeholder='Search Exercises' 
          type='text' 
        />
        <Button className='search-btn'
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform:'none',
            width: { lg:'175px', xs:'80px' },
            fontSize: { lg:'20px', xs:'14px' }, 
            height: '56px',
            position: 'absolute',
            right:'0'
          }}
          onClick={handleSearch}
          href='#scrollToShowRes'
        >
          Search
        </Button>
      </Box>

      <Box sx={{position: 'relative', width:'100%', p:'20px'}}>
            <HorizontalScrollbar 
              data={bodyParts}
              bodyParts 
              setBodypart={setBodyPart}
              bodyPart={bodyPart}
              isBodyParts
            />
      </Box>
    </Stack>
  )
}

export default SearchExercises