import mongoose from "mongoose"
import { user } from "@/model/user"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import authOption from "../../auth/[...nextauth]/option"
import dbconnect from "@/dbconnection/dbConnect"

export async function GET(req,content) {
    try{
        const session = await getServerSession(authOption)
        if(!session) return NextResponse.json({success:false,message:"User not authenticated"})
        dbconnect()
        const email = content.params.email
        const data = await user.find({email})
        return NextResponse.json({
        status:"success",
        data:data[0].todo
    })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            status:"failed",
            data:"internal issue"
        })
    }
}