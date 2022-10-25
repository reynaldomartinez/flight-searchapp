import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isUser = false;
  const [open, setOpen] = useState(false);
  // const isUser = true;

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-4 flex items-center sm:hidden">
              <button onClick={() => setOpen(!open)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                  <svg className="block h-7 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
              </button>
            </div>

            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <Link to='/'>
                  <h1 className='text-white logo'><i className="fa-solid fa-plane-arrival"></i> Flight Search</h1>
                </Link>
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <ul className='flex space-x-4'>
                  <li>
                    <Link to='/' className='text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Home</Link>
                  </li>
                  {/* ONLY SHOW IF LOGGED IN */}
                  {/* <li>
                    <Link to='/dashboard' className='text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>DASHBOARD</Link>
                  </li> */}

                  {/* ONLY SHOW AFTER SUBMITTING SEARCH */}
                  <li>
                    <Link to='/search-results' className='text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Search Results</Link>
                  </li>
                </ul>
              </div>
            </div>

            { isUser && <div className='flex absolute right-0 gap-x-1'>
                          <button type="button" className="flex hover:text-white rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </button>
                            <Link to='/login'>
                              <button type="button" className="text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                Login
                              </button>
                            </Link>
                        </div>
            }

            { !isUser &&  <div className='flex absolute right-0'>
                              <Link to='/login'>
                                <button type="button" className="text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                  Login
                                </button>
                              </Link>
                          </div>
            }
        </div>
      </div>
      
      { open &&
                <div class="sm:hidden absolute bg-gray-800 w-full border-t border-white">
                  <div class="space-y-1 px-2 pt-2 pb-3">
                    <ul>
                      <li>
                        <Link to='/' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium'>HOME</Link>
                      </li>
                      <li>
                        <Link to='/dashboard' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium'>DASHBOARD</Link>
                      </li>
                      <li>
                        <Link to='/login' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium border-t'>LOGIN</Link>
                      </li>
                      <li>
                        <Link to='/register' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium'>REGISTER</Link>
                      </li>
                    </ul>
                  </div>
                </div>
      }

    </nav>
  )
}

export default Navbar;