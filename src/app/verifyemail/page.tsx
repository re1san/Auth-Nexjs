"use client"
import axios from "axios";
import Link from "next/link";
import { useDebugValue, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token});
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  // This useEffect is used to grab the token whenever someone lands on this page
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if(token.length > 0){
      verifyUserEmail();
    }
  }, [token]);

  const router = useRouter();
  const pushToLogin = () => {
    router.push("/login")
  }

  return(
    <div className="flex min-h-screen items-center justify-center px-2 md:px-0">
        {
          error && (
            <div>
              <p className="text-sm font-semibold text-black">Error</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                Some error has been encountered {`:(`}
              </h1>
            </div>
          )
        }
        {
          !error && (
            <div>
              <p className="text-sm font-semibold text-black">{verified ? `Success` : `Verify`}</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                {verified ? "Email Verified, proceed to login :)" : "Check your mail for verification ..."} 
              </h1>
              <p className="mt-4 text-gray-500">
                Token: {token ? `${token}` : "No Token"}
              </p>
            {
              verified && (
                <div className="mt-6 flex items-center space-x-3">
                  <button
                    onClick={pushToLogin}
                    type="button"
                    className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                  Login
                  <ArrowRight size={16} className="ml-2" />
                  </button>
              </div>
              )
            }
            </div>  
          )
        }
    </div>
  )
}