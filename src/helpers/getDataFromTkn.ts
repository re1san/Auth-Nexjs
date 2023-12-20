import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromTkn = (request: NextRequest) => {
  try {
    const encodedTkn = request.cookies.get('token')?.value || '';
    // As you have the TOKEN_SECRET you can decrypt it
    const decodedTkn:any = jwt.verify(encodedTkn, process.env.TOKEN_SECRET!);
    return decodedTkn.id;

  } catch (error: any) {
    throw new Error(error.message)
  }
}