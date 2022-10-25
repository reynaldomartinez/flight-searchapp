import React from 'react';
import './Login.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Login() {
  return (
    <div className='login-wrapper flex flex-1 justify-center items-center flex-col'>
      <div className='login-title'>
        <h1>Login</h1>
      </div>
      <Card sx={{ }}>
        <CardContent class='flex flex-col justify-between h-full pb-3'>
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
            <TextField id="standard-basic" name='password' label="Password" variant="standard" />
          </Box>

          <div className='bottom-form'>
            <p className='pt-10'>
              <small>Need to&nbsp;
                <Link to='/register'>
                  <p className='register-link inline-block'>Register</p>
                </Link>
                ?
              </small>
            </p>

            <button className='px-10 p-2 mt-16 bg-gray-800 hover:bg-gray-900 text-white font-semibold border border-slate-200'>
                Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;