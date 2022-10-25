import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchCard from '../components/searchresults/SearchCard';
import { useNavigate } from 'react-router-dom';
 
function SearchResults() {
  let navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(true);
  const { state } = useLocation();
  let flightClass = state?.userInfo.classType;
  console.log(state);

  // const isEmpty = Object.keys(state).length === 0;
  useEffect(() => {
    if(state === null || state.userInfo === null) {
      navigate('/');
    }
  }, [])


  return (
      <section className={'home-wrapper flex flex-1 flex-row bg-slate-50'} >
        <aside className={ sideOpen ? 'h-full w-64 bg-slate-500 z-20': 'h-full w-16 bg-slate-500 z-20'}>
          <div className='flex flex-col w-full'>
            { sideOpen ? 
                <div className='flex justify-end pt-4 pr-4'><ArrowBackIcon fontSize='large' className='text-stone-50 hover:text-slate-800 h-7' onClick={() => setSideOpen(!sideOpen)} /></div> 
                :<div className='flex justify-center pt-4'><ArrowForward fontSize='large' className='text-stone-50 hover:text-slate-800 h-7' onClick={() => setSideOpen(!sideOpen)} /></div>
            }

            { sideOpen && 
              <div className='detail-section flex flex-col gap-y-10 pl-3 py-6 text-zinc-50'>
                <div className='flex gap-4'>
                  <div className='flex items-center'> 
                  </div>
                  <div className='flex flex-col'>
                    <h5 className='font-thin'>Flight Class: </h5>
                    <p className='flex pt-1'>{state?.userInfo.classType}</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex items-center'> 
                    <TripOriginIcon />
                  </div>
                  <div className='flex flex-col'>
                    <h5 className='font-thin'>Departure: </h5>
                    <p className='flex pt-1'>{state?.userInfo.from}</p>
                  </div>
                </div>

                <div className='flex gap-x-4'>
                  <div className='flex items-center'>
                    <FmdGoodIcon />
                  </div>
                  <div className='flex flex-col'>
                    <h5 className='font-thin'>Arrival: </h5>
                    <p className='pt-1'>{state?.userInfo.to}</p>
                  </div>
                </div>
                
                <div className='flex gap-x-4'>
                  <div className='flex items-center'>
                  <CalendarMonthIcon />
                  </div>
                  <div className='flex flex-col'>
                    <h5 className='font-thin'>Departure Date: </h5>
                    <p className='flex pt-1'>{state?.userInfo.datepicker}</p>
                  </div>
                </div>

                <div className='flex gap-x-4'>
                  <div className='flex items-center'>
                  <PeopleAltIcon />
                  </div>
                  <div className='flex flex-col'>
                    <p className='flex pt-1'>{state?.userInfo.adults}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </aside>

        <main className='main-card flex flex-col items-start py-10'>
          <div className='flex flex-col gap-8'>
            <h2>Best flights from <span className='text-lg text-blue-800 font-bold leading-none'>{state?.userInfo.from}</span> to <span className='text-lg text-blue-800 font-bold leading-none'>{state?.userInfo.to}</span></h2>
              {state?.flightResults.map(flightOffer => {
                return <SearchCard flightResults={flightOffer} flightClass={flightClass} key={flightOffer.id} />
              })}
          </div>
        </main>
      </section>
  )
}

export default SearchResults;

               