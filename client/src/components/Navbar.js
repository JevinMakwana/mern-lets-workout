import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  return (
    // <div style={{ marginTop:{sm: '32px', xs:'20px'} ,display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ marginTop:'25px' ,display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to='/'>
        <img src={Logo} alt='logo' style={{
          width: "48px",
          height:'48px',
          margin: '0 20px'        
        }}/>
      </Link>
      <Stack direction='row' gap="40px" fontSize="24px" alignItems="flex-end" flexGrow={1}>
        <Link to="/" style={{textDecoration: 'none', color:'#3A1212', borderBottom:'3px solid #FF2625'}}>Home</Link>
        <a href='#scrollHere' style={{textDecoration: 'none', color:'#3A1212'}}>Exercises</a>
        {/* <Link to="/savedExercises" style={{textDecoration: 'none', color:'#3A1212'}}>SavedExercises</Link> */}
        <Link to="/savedExercisess" style={{textDecoration: 'none', color:'#3A1212'}}>SavedExercisess</Link>
      </Stack>
      <Link to="/auth">
        <Button variant='contained' color="error" style={{fontSize:"24px", textDecoration: 'none', color:'white', marginRight: '20px'}}>Login</Button>
      </Link>
    </div>
  )
}

export default Navbar
