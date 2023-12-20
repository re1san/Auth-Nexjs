import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

// export async function POST (request: NextRequest){
// }

export async function POST(request: NextRequest) {
  try {
    // .json() returns a JS Obj
    const reqBody = await request.json();
    const {username, email, password} = reqBody;
    console.log(reqBody);

    // Check if user already exist
    const user = await User.findOne({email});

    if(user){
      return NextResponse.json({
        error: "User already exists"
      }, {status: 400})
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save User in DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);
    // Also send the mail for verification
    await sendEmail({email: savedUser.email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "User created successfully",
      succes: true,
      savedUser
    })

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}