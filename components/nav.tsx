import React from 'react'

export default function Nav() {
  return (
    <div className='flex p-2 w-screen bg-primary-3 gap-2'>
        <button className='p-1 border-1 border-black bg-primary-2'>Mine handlelister</button>
        <button className='p-1 border-1 border-black bg-primary-2'>Delte lister</button>
        <button className='p-1 border-1 border-black bg-primary-2'>Ny liste</button>
    </div>
  )
}
