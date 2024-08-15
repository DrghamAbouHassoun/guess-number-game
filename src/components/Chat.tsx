"use client";
import { appendMessage } from '@/lib/features/chatSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Button, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import { IoChatboxEllipses, IoSend } from "react-icons/io5";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state: RootState) => state.chat);
  const { user } = useAppSelector((state: RootState) => state.auth)

  const [messageString, setMessageString] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (messageString) {
      dispatch(appendMessage({ body: messageString, username: user.name, createdAt: new Date() }))
      setMessageString("");
    }
  }

  return (
    <div>
      <div className="text-white">
        <h3 className="flex gap-2 items-center text-xl p-3"><IoChatboxEllipses size={24} className='text-purple-500' /> Chat:</h3>
      </div>
      <div className="rounded-md overflow-hidden">
        <div className="p-2 bg-gray-900 h-[250px] py-5 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {messages.map((item, index) => (
            <div key={index} className={`rounded-md p-2 px-3 bg-gray-600 w-fit ${item.username === user.name ? "self-end" : "self-start"}`}>
              <p className={`text-xs text-teal-400 font-bold`}>{item.username === user.name ? "Me" : item.username}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-800 flex gap-2 p-2">
          <TextInput 
            className='flex-1 rounded' 
            value={messageString} 
            placeholder='Type a message here...'
            onChange={(e) => setMessageString(e.target.value)} 
          />
          <Button className='flex justify-center items-center' type="submit">
            <IoSend size={20} />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Chat