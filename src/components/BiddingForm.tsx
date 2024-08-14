"use client";
import { handleStartGame } from '@/lib/features/gameSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { FormEvent, useState } from 'react'

const BiddingForm = () => {
  const dispatch = useAppDispatch();

  const [biddingPoints, setBiddingPoints] = useState<number>(0);
  const [biddingMultiplier, setBiddingMultiplier] = useState<number>(1.0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(handleStartGame({ points: biddingPoints, multiplier: biddingMultiplier }))
  }

  return (
    <form className="max-w-[400px] p-2" onClick={handleSubmit}>
      <div className="my-3">
        <Label htmlFor='biddingPoints' className='text-white'>Points:</Label>
        <TextInput
          type="number"
          name="biddingPoints"
          value={biddingPoints}
          onChange={(e) => setBiddingPoints(parseInt(e.target.value))}
        />
      </div>
      <div className="my-3">
        <Label htmlFor='biddingMultiplier' className='text-white'>Multiplier:</Label>
        <TextInput
          type="number"
          name="biddingMultiplier"
          min={1}
          max={10}
          value={biddingMultiplier}
          onChange={(e) => setBiddingMultiplier(parseFloat(e.target.value))}
        />
      </div>
      <Button type='submit' fullSized className='my-3'>Bid</Button>
    </form>
  )
}

export default BiddingForm