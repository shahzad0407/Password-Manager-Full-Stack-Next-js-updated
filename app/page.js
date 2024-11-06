'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
    const session = useSession()
    return (
        <>
            <div className="flex flex-col justify-center items-center md:min-h-[86vh] min-h-[90vh] bg-black" >
                <div className=" w-full flex flex-col items-center justify-center">
                    <Link href='/'>
                        <h1 className='font-bold text-2xl text-red-500 gap-4'>
                            <span >Password  </span>
                            <span>Manager</span>
                        </h1>
                    </Link>
                    <h2 className="font-bold text-white text-center">
                        Your Digital Keys, Safeguarded with Precision.
                    </h2>
                </div>
                {session.status == 'authenticated' ?
                    <Link href='home'>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">Dashboard</button>
                    </Link>
                    : <div className='flex justify-center w-full items-center my-8 bg-gray-700 '>
                        <Link href='/login'>
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">Login</button>
                        </Link>
                        <Link href='signup'>
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">SignUp</button>
                        </Link>
                    </div>}
            </div>
        </>
    )
}
