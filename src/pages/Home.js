import React, { useState } from 'react';
import './Home.css';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Fab from '@mui/material/Fab';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import Switch from '@mui/material/Switch';
import Autocomplete from '../components/home/Autocomplete';

const axios = require('axios');

function Home() {
  let navigate = useNavigate();
  const [date, setDate] = useState(dayjs().toISOString().slice(0, 10));
  const [errorMsg, setErrorMsg] = useState({});
  const [value, setValue] = useState('1');

  const handleChange = (newValue) => {
    setValue(newValue);
  }
// UPDATE KEY VALUE FOR DAY KEY ONLY
  const handleDate = (day) => {
    setDate(day);
    setFormData((prev) => ({
      ...prev,
      datepicker: date
    }))
  }

  // class type must be UPPERCASE?
  const [formData, setFormData] = useState({
    classType: 'Economy',
    adults: 1,
    from: '',
    to: '',
    datepicker: new Date().toISOString().slice(0, 10)
  });

// CHANGE TO VALIDATE FIRST THEN CALL API
  const [fromMsg, setfromMsg] = useState('')
  const handleFormChange = (e) => {
    // REMOVE OR CLEAR IF SAME PAGE RESULTS
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      from: fromId,
      datepicker: date
    }))
  }

  const [keyword, setKeyword] = useState('');
  // airport name
  const [airports, setAirports] = useState('');
  // airport id needed to search
  const [fromId, setFromId] = useState('');
  
  const searchAirport = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    // keyword
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

  const formSubmit = async (event) => {
    event.preventDefault();
    
    if((Object.keys(formData.from).length === 0) || (Object.keys(formData.to).length === 0)) {
      setfromMsg('* No empty fields allowed');
      return;
    } else {
      setfromMsg('');
    }

    try {
      console.log(formData);
      // ALERT IF EMPTY FIELDS ADD VALIDATION FIRST AND THEN CALL SERVER API
      // API CALL TO BACKEND
      const flightRes = await axios.post('http://localhost:3001/search', {
        data: formData
      });
      console.log(flightRes);
      navigate('/search-results', {
        state: {userInfo: formData, flightResults: flightRes.data},
      });
    } catch (error) {
        setErrorMsg({
          msg: 'Sorry try again later.'
        })
        console.log(error);
    }
  }


  return (
    <section className='home-wrapper flex-1'>
      <div className='flex flex-col items-start m-auto max-w-7xl h-full px-2 pb-24 sm:px-6 lg:px-8'>
        <section className='welcome mb-10'>
          <h1 className=''><br />
          </h1>

          {/* <Autocomplete /> */}

        </section>

        <section className='search-wrapper shadow-2xl w-full'>
          <TabContext value={value} className='p-11'>
            <Box>
              {/* TABS */}
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="One way" value="1" className='bg-white label-input' />
              </TabList>
            </Box>
{/* TAB ONE ---- ONE WAY */}
            <TabPanel value="1" className='flex flex-col'>
              <section className='form-wrapper py-11 pl-11 pr-4 flex '>
{/* SWAP STRING IF ONCLICK */}
                {/* <p>ONE WAY SECTION</p> */}
{/* FORM ------------------------------------------------------------------------------------- */}
                <form className='search-form' onSubmit={formSubmit}>
        {/* FLIGHT CLASS  ----------------------------------------------*/}
                  <div className='flex gap-4'>
                    {/* FLIGHT CLASS */}
                    <Box sx={{ minWidth: 150, pb: 2}}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Flight Class *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.classType}
                          label="Economy"
                          name='classType'
                          onChange={handleFormChange}
                          variant="outlined"
                        >
                          <MenuItem value={'Economy'}>Economy</MenuItem>
                          <MenuItem value={'BUSINESS'}>Business</MenuItem>
                          <MenuItem value={'FIRST'}>First</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
          {/* ADULTS ---------------------------------------------- */}
                    <Box sx={{ minWidth: 100, pb: 2}}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Adults *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.adults}
                          label="Adults"
                          name="adults"
                          onChange={handleFormChange}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <TextField id="outlined-basic" name="from" onChange={(e) => {searchAirport(e); setFromId(e.target.value)}} value={keyword}  label="From" variant="outlined" size='large' className='w-full' 
                    sx={{
                      '& > :not(style)': { mb: 0 },
                    }}
                    InputProps={{
                      endAdornment: (
                        <MyLocationIcon></MyLocationIcon>
                      )
                    }}
                  />
                  {/* AUTOCOMPLETE FORM */}
                  { airports.data?.length > 0 && 
                      <div className='w-72 max-h-36 overflow-x-auto bg-slate-200 text-sm text-stone-700'>
                        <ul>
                          {airports.data
                              .map(x => <li key={x.id} ><span className='' value={x.data} onClick={() => {setFromId(x.id); setKeyword(x.name)}}>  {x.name}  </span></li>)
                          }
                        </ul>
                      </div>
                  }  

                  <TextField id="outlined-basic" name="to" onChange={handleFormChange} label="To" variant="outlined" className='w-full'
                    InputProps={{
                      endAdornment: (
                        <LocationOnIcon></LocationOnIcon>
                      )
                    }}
                  />

                  <div className='pt-4 flex'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        label="Departure"
                        disablePast={true}
                        value={date}
                        onChange={(newValue) => {
                          const d = newValue.format('YYYY-MM-DD');
                          // console.log(d);
                          handleDate(d);
                        }}
                        name="datepicker"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <button className='px-10 py-4 ml-1 bg-gray-800 hover:bg-gray-900 text-white rounded-md border border-slate-200 search-btn'>
                      Search
                    </button>
                  </div>

                  {/* MESSAGE */}
                  {fromMsg && <p className='flex text-sm text-red-700'>{fromMsg}</p>}
                </form>

          {/* BASIC FAB */}
                  <Box sx={{ '& > :not(style)': { m: 1, mt: 6 } }}>
                    {/* <Fab color="primary" aria-label="add">
                      <div className="fa-2x">
                        <UnfoldMoreIcon></UnfoldMoreIcon>
                      </div>
                    </Fab> */}
                  </Box>
              </section>
            </TabPanel>
          </TabContext>

          {errorMsg &&  <p>{errorMsg.msg}</p>}

        </section>
      </div>
    </section>
  )
}

export default Home;
