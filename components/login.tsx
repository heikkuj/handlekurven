'use client'

import React from 'react';
import { useState, useEffect } from 'react';

const LoginButton = (props: any) => {
  return <div className='bg-primary-1'>
        <div>Du er ikke innlogget. Logg inn for å dele lister.</div>
        <div>
          <button onClick={props.toggleLoggedIn}>Logg inn</button>
        </div>
        </div>
}

const LogoutButton = (props: any) => {
  return <div className='bg-primary-1'>
  <div>Hei!</div>
  <div>
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
