"use client";
import { Button } from 'flowbite-react';
import React, { use, useEffect, useState } from 'react';

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import Chart from './Chart';
import Layout from './Layout';
import BiddingForm from './BiddingForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { handleEndGame, handleEndRound } from '@/lib/features/gameSlice';
import BiddingsTable from './BiddingsTable';
import RegisterForm from './RegisterForm';
import BiddersTable from './BiddersTable';
import Chat from './Chat';
import { FaMedal, FaUserAlt } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Game = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { currentPoints, isRoundStarted, randomPoint, currentRound, isGameEnded } = useAppSelector((state: RootState) => state.game);
  const { status } = useAppSelector((state: RootState) => state.auth);

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isRoundStarted) {
      if (count >= randomPoint) {
        dispatch(handleEndRound());
        setCount(1);
        return;
      }

      const intervel = setInterval(() => {
        setCount(prev => Math.round((prev + 0.1) * 100) / 100);
      }, 100)
      return () => clearInterval(intervel);
    }
  }, [count, isRoundStarted, randomPoint]);

  useEffect(() => {
    if (currentRound >= 4) {
      dispatch(handleEndGame());
    }
  }, [currentRound]);

  return (
    <Layout>
      {status === "authenticated" ?
        <>
        <div className="flex items-center gap-5 mb-5">
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <FaMedal className="text-yellow-300" size={24} />
            {currentPoints}
          </div>
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <FaUserAlt className="text-teal-400" size={24} />
            {user?.name || "Unknown"}
          </div>
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <IoGameController className="text-green-500" size={24} />
            {currentRound} / 4
          </div>
        </div>
          {randomPoint}
          <div className='grid grid-cols-2 gap-5'>
            <BiddingForm />
            <Chart value={isRoundStarted || randomPoint === 10 ? count : randomPoint} />
            {/* <h3>Current Poinst: {currentPoints}</h3> */}
            {/* <BiddingsTable /> */}
            <BiddersTable />
            <Chat />
          </div>
        </> :
        <RegisterForm />
      }
    </Layout>
  )
}

export default Game