import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/user.model";
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = request.json()
        const {userName,email,password} = reqBody;

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "user already exists"},{status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        


    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
