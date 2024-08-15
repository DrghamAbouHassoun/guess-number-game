"use client";
import { handleRegister } from '@/lib/features/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Button, FloatingLabel } from 'flowbite-react'
import React, { FormEvent, useState } from 'react'

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName) {
      alert("Username Should Be prvided")
      return;
    }
    dispatch(handleRegister({ name: userName }));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[400px] bg-gray-900 p-5 mx-auto rounded-md">
      <h1 className="text-gray-400 text-3xl font-bold text-center mb-4">Enter Your Name:</h1>
      <div>
        <FloatingLabel className='bg-gray-900' variant="outlined" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <Button type="submit" fullSized >Start The Game</Button>
    </form>
  )
}

export default RegisterForm