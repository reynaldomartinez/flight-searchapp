import React, { useState } from 'react';

function Autosearch() {
    const [keyword, setKeyword] = useState('');
    // airport name
    const [airports, setAirports] = useState('');
    // airport id needed to search
    const [fromId, setFromId] = useState('');
    // list of all airports
    const [selectedAirport, setSelectedAirport] = useState('');

  return (
    <div>
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

export default Autosearch;