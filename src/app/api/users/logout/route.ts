import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // To remove the cookies
    const res = NextResponse.json({
      message: "Logout successful",
      success: true,
    })

    res.cookies.set("token", "", {
      httpOnly: true, expires: new Date(0)
    })

    return res;

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}