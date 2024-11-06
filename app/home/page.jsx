"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ToastContainer,toast } from 'react-toastify';

const Dashboard = () => {
    const [form, setform] = useState({ site: "", username: "", password: "", id: "" })
    const [passwords, setpasswords] = useState([])
    const [show, setshow] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [isSaving, setisSaving] = useState(false)

    const session = useSession()

    const email = session.data?.user?.email

    const getPasswords = async () => {
        let req = await fetch(`/api/get/${email}`)
        let passwords = await req.json()
        setpasswords(passwords.data)
    }

    useEffect(() => {
        if (session.status == "authenticated") {
            getPasswords()
        }

    }, [session])


    if (session.status == 'loading') return <>Loading</>
    if (session.status == 'unauthenticated') return <>Please Login first</>


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        setisSaving(true)
        if (form.site.length <= 3 && form.username.length <= 3 && form.password.length <= 3) {
            toast("short")
        }
        else {
            await fetch("/api/add", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4(), email })
            })
            setpasswords([...passwords, { ...form, id: uuidv4() }])
        }
        setisSaving(false)
    }

    const editPass = (id) => {
        setform(passwords.filter(i => i.id === id)[0]);
    }

    const deletePass = async (id) => {
        setisLoading(true)
        let toBeDeleted = passwords.filter(i => i.id == id)
        const res = await fetch(`/api/delete/${toBeDeleted[0]._id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email })
        })
        const response = await res.json()
        getPasswords()
        setisLoading(false)
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <>
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
            <div className='w-full py-4 text-black md:min-h-[86vh] min-h-[90vh]'>
                <div className='flex justify-center items-center m-4'>
                    <div className='font-mono mr-3 text-lg'>URL:</div>
                    <input name='site' className='rounded-lg w-1/2' onChange={handleChange} value={form.site}></input>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-4 '>
                    <div className='font-mono text-lg'>Username:</div>
                    <input name='username' className=' rounded-lg' onChange={handleChange} value={form.username}></input>
                    <div className='font-mono text-lg'>Password:
                    </div>
                    <div className='relative'>
                        <input type={show ? 'password' : 'text'} name='password' className=' rounded-lg' onChange={handleChange} value={form.password}></input>
                        <img className='absolute w-5 right-1 top-1 cursor-pointer' src={show ? "/hidden.png" : "/eye.png"} onClick={() => { setshow(!show) }}></img>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='font-bold text-red-500 bg-gray-950 rounded-lg p-2 mt-8 text-xl' onClick={savePassword}>Save Password</button>
                </div>
                <div className='flex flex-col justify-center items-center py-4'>
                    <span className='font-bold text-xl text-black py-4'>Your Passwords</span>
                    {isLoading ? <span className='font-bold text-xl text-black py-4'>Deleting</span>
                        : ""}
                    {isSaving ? <span className='font-bold text-xl text-black py-4'>Saving</span>
                        : ""}

                    <Table>
                        <TableCaption>A list of your recent saved passwords.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Site</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Password</TableHead>
                                <TableHead className="text-center">Edits</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {passwords.length === 0 ? <tr><td>No passwords to show</td></tr> :
                                passwords.map((item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.site}</TableCell>
                                            <TableCell>{item.username}</TableCell>
                                            <TableCell>
                                                <span type='password'>{item.password}</span>
                                                <img className='w-6 inline-block cursor-pointer' src='/copy.png' onClick={() => { copyText(item.password) }}></img>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className=' flex justify-center items-center gap-4'>
                                                    <img className='w-6 cursor-pointer' src="/edit.png" alt="edit" onClick={() => { editPass(item.id) }}></img>
                                                    <img className='w-6 cursor-pointer' src="/delete.png" alt="delete" onClick={() => { deletePass(item.id) }}></img>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </div>
            </div></>
    );
}

export default Dashboard
