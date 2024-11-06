import { NextResponse } from "next/server"
import { user } from "@/model/user"
import dbconnect from "@/dbconnection/dbConnect"
import { getServerSession } from "next-auth"
import authOption from "../../auth/[...nextauth]/option"

export async function DELETE(req,content) {
    try{
        
        const session = await getServerSession(authOption)
        if(!session) return NextResponse.json({success:false,message:"User not authenticated"})
        dbconnect()
        const {email} = await req.json()
        const id = content.params.passwordid
        const data = await user.findOneAndUpdate(
            { email },
            { $pull: {todo : {_id:id}} }
        );
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