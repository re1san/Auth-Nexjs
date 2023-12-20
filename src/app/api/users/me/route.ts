import { getDataFromTkn } from "@/helpers/getDataFromTkn";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export const GET =async (reqest: NextRequest) => {
  try {
    const userId = await getDataFromTkn(reqest);
    // Find the USER with this id, dont give me his password (use - sign)
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400});
  }
}