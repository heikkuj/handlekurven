import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className='flex p-2 w-screen bg-primary-3 gap-2 font-semibold text-white'>

        <Link href='/mine-lister'><button className='p-2 rounded-sm text-shadow-lg bg-primary-2'>Mine handlelister</button></Link>
        <Link href='/delte-lister'><button className='p-2 rounded-sm text-shadow-lg bg-primary-2'>Delte lister</button></Link>
        <Link href='#'><button className='p-2 rounded-sm text-shadow-lg bg-primary-2'>Ny liste</button></Link>

    </div>
  )
}
