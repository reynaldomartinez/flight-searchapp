import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Logos } from '../../assets/search-cards/Logos';


import './SearchCard.css';

function SearchCard({flightResults, flightClass}) {
    // RETURN DATE IN STANDARD FORMAT
    const changeDateFormat = (splitDate) => {
        let date = [...splitDate].slice(0,10).join('').split('-');
        let year = date.shift();

        return date.concat(year).join('-');
    }

    const timeFormat = (splitTime) => {
        let startInd = splitTime.indexOf('T');
        let result  = splitTime.slice(startInd + 1, splitTime.length - 3);

        let timeSplit = result.split(':');
        let hour = (timeSplit[0] > 12) ? timeSplit[0] - 12 : timeSplit[0];
        let dayOrNight = (hour >= 12) ? 'pm' : 'am';

        return `${hour}:${timeSplit[1]} ${dayOrNight}`;
    }
    
    // GRAB AIRLINE COMPANY NAME WITH AIRLINE CODE
        const [airlineCode, setAirlineCode] = useState('');
        let code = flightResults.validatingAirlineCodes;
        useEffect(() => {
            axios.post('http://localhost:3001/flight-airline', {
                data: code
            }).then((res) => {
                setAirlineCode(res.data);
            });
        }, []);


        const test = Logos.find(x => x.name === airlineCode);
        console.log(test);

    return (
        <main className='search-card py-5 shadow-md bg-neutral-100 hover:bg-indigo-50 hover:shadow-lg'>
            <div className='seat-prices absolute pl-1 pt-1 pr-10'>
                <h2 className='bg-indigo-400 p-1 rounded-sm'>Price: ${flightResults.price.base} + taxes</h2>
                <p><small>Seats available: {flightResults.numberOfBookableSeats}</small></p>
            </div>
            <div className="flex card-content border-dashed border-neutral-300 border-t-2 border-b-2 gap-4 p-8">
                <div className="flex flex-col ">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                        <span className="mr-1 ">Total Duration: {flightResults.itineraries[0].segments[0].duration.slice(2).toLowerCase()}</span>
                        <br />
                        <span>{airlineCode}</span>
                    </div> 
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                        {flightResults.itineraries[0].segments[0].departure.iataCode}
                    </div>
                    <div className="text-xs flex flex-col">
                        Departure Date: {changeDateFormat(flightResults.itineraries[0].segments[0].departure.at)}
                        <br />
                        Departure Time: {timeFormat(flightResults.itineraries[0].segments[0].departure.at)}
                    </div>
                </div>
                <div className="flex flex-col mx-auto pt-10">

                    {/* CHANGE TO AIRLINE LOGO */}
                    {test ? <img src={test.img} className="w-20 h-20 p-1" alt="airline logo" /> : <img src={require('../../assets/search-cards/default.png')} className="w-20 h-20 p-1" alt="Airplane Logo" />}
                </div>
                <div className="flex flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                        <span className="mr-1">Class: {flightClass} </span>
                        <br />
                        <span>Stops: {flightResults.itineraries[0].segments[0].numberOfStops}</span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                    {flightResults.itineraries[0].segments[0].arrival.iataCode}
                    </div>
                    <div className="text-xs">
                        Arrival: {changeDateFormat(flightResults.itineraries[0].segments[0].arrival.at)}
                        <br />
                        Arrival Time: {timeFormat(flightResults.itineraries[0].segments[0].arrival.at)}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchCard
