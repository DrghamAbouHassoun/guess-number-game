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
import { handleEndGame } from '@/lib/features/gameSlice';
import BiddingsTable from './BiddingsTable';
import RegisterForm from './RegisterForm';
import BiddersTable from './BiddersTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Game = () => {
  const dispatch = useAppDispatch();
  const { currentPoints, isGameStarted, randomPoint } = useAppSelector((state: RootState) => state.game);
  const { status } = useAppSelector((state: RootState) => state.auth);

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isGameStarted) {
      if (count >= randomPoint) {
        dispatch(handleEndGame());
        setCount(0);
        return;
      }
  
      const intervel = setInterval(() => {
        setCount(prev => Math.round((prev + 0.1) * 100) / 100);
      }, 100)
      return () => clearInterval(intervel);
    }
  }, [count, isGameStarted, randomPoint]);

  return (
    <Layout>
      {status === "authenticated" ?
      <>
      {randomPoint}
      <Chart value={count} />
      <BiddingForm />
      <h3>Current Poinst: {currentPoints}</h3>
      <BiddingsTable />
      <BiddersTable />
      </> :
      <RegisterForm />
      }
    </Layout>
  )
}

export default Game