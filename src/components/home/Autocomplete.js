import React, { useState }  from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

function Autocomplete() {
     // AUTOCOMPLETE
  // 
  const [keyword, setKeyword] = useState('');
  // airport name
  const [airports, setAirports] = useState('');
  // airport id needed to search
  const [fromId, setFromId] = useState('');
  // list of all airports
  const [selectedAirport, setSelectedAirport] = useState('');

  const searchAirport = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    console.log('keyword',keyword);

    if(keyword.length > 0) {
      axios.post('http://localhost:3001/airports', {
        data: keyword
      }).then((res) => {
        console.log(res);
        // airport list
        setAirports(res);
      }).catch((e) => console.log(e));
    }
  }

  // console.log('keyword 2' ,keyword)
  // console.log(airports)
  // id needed to search
  // console.log(fromId)
  //  selected from list 
  // console.log(selectedAirport)
  return (
    <div>
        <label>Test Input:</label>
        <br />
        <input type='text' className='bg-slate-200' onChange={(e) => searchAirport(e)} value={keyword} />
        { airports.data?.length > 0 ? <div className='w-72 max-h-48 overflow-x-auto bg-slate-200 text-sm text-stone-700'>
            <ul>
            {airports.data
                .map(x => <li key={x.id} ><span className='' value={x.data} onClick={() => {setFromId(x.id); setSelectedAirport(x.name); setKeyword(x.name)}}>  {x.name}  </span></li>)
            }
            </ul>
            </div> : 
                    ''
        }  
        
    </div>
  )
}

export default Autocomplete;