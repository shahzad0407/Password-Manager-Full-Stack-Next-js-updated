"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react'


const Login = () => {
  

  const [form, setform] = useState({})
  const router = useRouter()
  const [isSubmiting, setisSubmiting] = useState(false)

  const handleClick = async () => {
    // let req = await fetch(`/api/signIn`, {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(form)
    // })
    // const response = await req.json();
    // if (response.message == "User Successfully Logged In") {
    //   router.push(`/home/${response.email}`)
    //   setloginInfo(true)
    // }else{
    //   toast(`${response.message}`);
    // }
    setisSubmiting(true)
    const response = await signIn('credentials',{
      email:form.email,
      password:form.password,
      redirect: false
    })
    if(response.status === 200){
      toast(`Successfully Logged in`)
      router.push("/")
      setisSubmiting(true)
    }else{
      toast(`Invalid Credentials`)
      setisSubmiting(true)
    }
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <div>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                onChange={handleChange}
                name='email'
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                onChange={handleChange}
                name='password'
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </Link>
            </div>
            <div className="mt-8">
              {isSubmiting ? <button onClick={handleClick} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Submitting ...
              </button>:<button onClick={handleClick} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>}
            </div>
            <Link
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
            </Link>
            <div className="mt-4 flex items-center w-full text-center">
              <Link href='/signup'
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?

                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
