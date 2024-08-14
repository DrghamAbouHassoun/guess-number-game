"use client";
import { handleStartGame } from '@/lib/features/gameSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { FormEvent, useState } from 'react'

const BiddingForm = () => {
  const { currentPoints } = useAppSelector((state: RootState) => state.game)
  const dispatch = useAppDispatch();

  const [biddingPoints, setBiddingPoints] = useState<number>(0);
  const [biddingMultiplier, setBiddingMultiplier] = useState<number>(1.0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (biddingPoints > currentPoints) {
      alert("You don't have enough points to bid");
      return;
    }
    dispatch(handleStartGame({ points: biddingPoints, multiplier: biddingMultiplier }));
    setBiddingMultiplier(0);
    setBiddingPoints(0);
  }

  return (
    <form className="max-w-[400px] p-2" onSubmit={handleSubmit}>
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
      <Button type='submit' fullSized className='my-3'>Set a Bid</Button>
    </form>
  )
}

export default BiddingForm