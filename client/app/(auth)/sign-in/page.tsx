"use client";

import React from 'react'
import { LoginForm } from '@/components/login-form'
import { Spinner } from '@/components/ui/spinner';
import { authClient } from "@/lib/auth-client";

import { useRouter } from 'next/navigation';
const Page = () => {
    const {data, isPending} = authClient.useSession();
    const router = useRouter();
  
    if(isPending) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner/>
        </div>
      )
    }
    if(data?.session && data?.user) {
      router.push("/")
    }
  
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Page
