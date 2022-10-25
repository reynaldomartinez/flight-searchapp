import React from 'react';
import './Register.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Register() {
  return (
    <div className='login-wrapper flex flex-1 justify-center items-center flex-col'>
      <div className='register-title'>
        <h1>Register</h1>
      </div>
      <Card sx={{ }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { },
            }}
            noValidate
            autoComplete="off"
            className="flex flex-col items-center"
          >
            <TextField id="standard-basic" name='username' label="Username" variant="standard" />
            <TextField id="standard-basic" name='email' label="Email" variant="standard" />
            <TextField id="standard-basic" name='password' label="Password" variant="standard" />
          </Box>

          <p className='pt-10'>
            <small>Have an account?&nbsp;
              <Link to='/login'>
                <p className='login-link inline-block'>Login</p>
              </Link>
            </small>
          </p>
          
          <button className='px-10 py-2 mt-14 bg-gray-800 hover:bg-gray-900 text-white font-semibold border border-slate-200'>
              Register
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register;