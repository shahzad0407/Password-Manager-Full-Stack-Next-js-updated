"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const NavbarMain = () => {
  const session = useSession()
  return (
    <>
      <div className='flex justify-around items-center w-full py-2 bg-black '>
        <Link href='/'>
          <h1 className='font-bold text-2xl text-red-500 ml-4 '>Password Manager</h1>
        </Link>
         {session.status =='authenticated' ? <div className='flex'>
          <Link href='/login'>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Logged in as {session.data?.user?.firstName}
            </button>
          </Link>
          <Link href='/login'>
            <button onClick={()=>{signOut()}} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Log out
            </button>
          </Link>
        </div>:<div className='flex'>
          <Link href='/login'>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Login
            </button>
          </Link>
          <Link href='/signup'>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              SignUp
            </button>
          </Link>
        </div>} 
      </div>
    </>
  )
}

export default NavbarMain
