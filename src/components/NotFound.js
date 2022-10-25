import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

  return (
    <div className='not-found flex flex-col justify-center text-center h-screen'>
        <h1>There's nothing here!</h1>

        <div className='mx-auto px-2 sm:px-6 lg:px-8'>
          <Link to='/'>
            <button className='px-10 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-md border border-slate-200'>
              GO HOME
            </button>
          </Link>
        </div>
    </div>
  )
}

export default NotFound;