import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { user } from "@/model/user"
import dbconnect from "@/dbconnection/dbConnect"
import { getServerSession } from "next-auth"
import authOption from "../auth/[...nextauth]/option"



export async function POST(req){
    try{
        const session = await getServerSession(authOption)
        if(!session) return NextResponse.json({success:false,message:"User not authenticated"})
        dbconnect()
        const {site,username,password,id,email} = await req.json();
        const data = await user.findOneAndUpdate(
            { email: email }, 
            { $push: { todo: {site,username,password,id}  } });
         
    return NextResponse.json({
        status:"success",
        data:data
    })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            status:"failed",
            data:"internal issue"
        })
    }
} 



