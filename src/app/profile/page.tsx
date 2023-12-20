"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Code2, Info } from 'lucide-react';

export default function ProfilePage() {

  const router = useRouter();

  const [data, setData] = useState(""); // data will contain ID
  //const [toggle, setToggle] = useState(false); // toggle is to show the ID/not

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success('Logout succesful', {
        className: 'font-medium text-black rounded-sm'
      })
      router.push("/login");

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        className: 'font-medium text-black rounded-sm'
      })
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log (res.data);
    setData(res.data.data._id);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative h-[400px] w-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1700770601835-4f659507dab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="AirMax Pro"
          className="z-0 h-full w-full object-cover rounded-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-sm"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <div className="flex">
            <h1 className="text-lg font-semibold text-white">Delba</h1>
            {data == "" 
            ? 
            <button 
            onClick={getUserDetails}
            className="ml-2 cursor-pointer text-xs font-semibold text-gray-300"><Code2 size={14}/></button> 
            : 
            <div className="flex">
              <Link className="ml-2 mt-2 text-xs font-semibold text-gray-300 hover:underline" href={`/profile/${data}`}> {data} </Link> 
              <ArrowUpRight className="ml-1 mt-2 text-gray-300" size={14}/> 
            </div>}
          </div>
          <p className="mt-2 text-sm text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
          </p>
          <button 
          onClick={logout}
          className="hover:underline mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
            <ArrowLeft className="mr-1" size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}