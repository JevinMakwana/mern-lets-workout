import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';


import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Auth } from "./pages/auth.js";
import SavedExercises from './pages/SavedExercises';
import SavedExercisess from './pages/SavedExercisess.js';


const App = () => {
  return (
    <div>
      <Navbar />  
    <Box width="400px" sx={{width: {xl: '1488px'}}} m="auto">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path='/exercise/:id' element={<ExerciseDetail />} />
        <Route path='/savedExercisess' element={<SavedExercisess />}/>
      </Routes>
    </Box>
      <Footer />
    </div>
  )
}

export default App