import React, { useState } from 'react';
import './Dashboard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Dashboard() {
  // const [sideOpen, setSideOpen] = useState(true);
  // const { state } = useLocation();
  // console.log(state);
  // const user = {
  //   name: null
  // }

  return (
      <section className='flex flex-col flex-1 gap-y-6 max-w-7xl py-6 mx-auto'>
        <div className='order-card w-96 pl-6 pt-6 border border-neutral-300 hover:shadow-md'>
          <h1>Order #: 884938</h1>
          <p>From: Atlanta, Georgia</p>
          <p>TO: Miami, Florida</p>
          <button className='bg-teal-300 hover:text-slate-200 px-4 py-2 rounded-sm hover:bg-teal-500 float-right m-2'>More Info...</button>
        </div>

        <div className='order-card w-96 pl-6 pt-6 border border-neutral-300 hover:shadow-md'>
          <h1>Order #: 884938</h1>
          <p>From: Atlanta, Georgia</p>
          <p>TO: Miami, Florida</p>
          <button className='bg-teal-300 hover:text-slate-200 px-4 py-2 rounded-sm hover:bg-teal-500 float-right m-2'>More Info...</button>
        </div>

        <div className='order-card w-96 pl-6 pt-6 border border-neutral-300 hover:shadow-md'>
          <h1>Order #: 884938</h1>
          <p>From: Atlanta, Georgia</p>
          <p>TO: Miami, Florida</p>
          <button className='bg-teal-300 hover:text-slate-200 px-4 py-2 rounded-sm hover:bg-teal-500 float-right m-2'>More Info...</button>
        </div>



      </section>
  )
}

export default Dashboard;