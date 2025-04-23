'use client'

import React from 'react';
import { useState } from 'react';

const LoginButton = (props: any) => {
  return <div className='bg-primary-1'>
        <div className='flex px-2 pt-2 justify-between'>
          <p>Logg inn for å dele lister.</p>
          <button onClick={props.toggleLoggedIn}>Logg inn</button>
        </div>
        </div>
}

const LogoutButton = (props: any) => {
  return <div className='bg-primary-1'>
  <div className='flex px-2 pt-2 justify-between'>
    <p className=''>Hei!</p>
    <button onClick={props.toggleLoggedIn}>Logg ut</button>
  </div>
  </div>
}

export default function Login() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const toggleLoggedIn = () => {
      setLoggedIn((currState) => {
          return !currState;
      })
    }

    if (loggedIn)
      return <LogoutButton toggleLoggedIn={toggleLoggedIn} />
    else
      return <LoginButton toggleLoggedIn={toggleLoggedIn} />
  }
