import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-black text-white font-semibold flex justify-around items-center'>
      Created By Shahzad
      <div className='flex justify-center items-center'>
        <img className='w-7 bg-white border rounded-full' src='/github.png'></img>
        <span className='inline-block font-semibold text-white'>GitHub</span> 
      </div>
    </div>
  )
}

export default Footer
