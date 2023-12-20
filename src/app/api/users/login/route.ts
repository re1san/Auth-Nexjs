import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { Just_Me_Again_Down_Here } from "next/font/google";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request : NextRequest) => {
  try {
    const reqBody = await request.json();
    const {email, password} = reqBody;
    console.log(reqBody);
    // Check if user exists
    const foundUser = await User.findOne({email})
    if(!foundUser){
      return NextResponse.json({error: "User doesnot exist"}, {status: 400})
    }
    // Check if password is correct
    const validPass = await bcryptjs.compare(password, foundUser.password);
    if(!validPass){
      return NextResponse.json({error: "Invalid password"}, {status: 400});
    }
    // Create token data & token using jwt
    const tokenData = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email
    } 
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    })
    // This response can access cookies
    response.cookies.set("token", token, {httpOnly: true});
    return response;

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status:500})
  }
}
