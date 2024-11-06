import { user } from "@/model/user";
import { NextResponse } from "next/server";
import  bcrypt  from "bcrypt";
import dbconnect from "@/dbconnection/dbConnect";

export async function POST(request) {
    try {
        
        dbconnect()
        const { firstName, lastName, email, phoneNumber, password,todo } = await request.json();
        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            return NextResponse.json({
                message: "Fill all the required fields"
            })
        }
        const existingUser = await user.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User already exits"})
        }
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10)
        }catch(error){
            return NextResponse.json({message:"Password was unable to hash"})
        }
        const newUser = await user.create({
            firstName,lastName,email,phoneNumber,password:hashedPassword,todo
        })
        return NextResponse.json({message:true,message:"User Created Successfully",data:newUser})
    } catch (error) { 
        return NextResponse.json({result:"false",message:"user not created"})
    }

}