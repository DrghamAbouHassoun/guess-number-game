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
    <form onSubmit={handleSubmit}>
      <div>
        <FloatingLabel variant="outlined" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <Button type="submit" fullSized >Register</Button>
    </form>
  )
}

export default RegisterForm