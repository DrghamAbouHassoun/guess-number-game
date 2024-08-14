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
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Game = () => {
  const { currentPoints, isGameStarted, randomPoint } = useAppSelector((state: RootState) => state.game);

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isGameStarted) {
      if (count >= randomPoint) {
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
      {randomPoint}
      <Chart value={count} />
      <BiddingForm />
      <h3>Current Poinst: {currentPoints}</h3>
    </Layout>
  )
}

export default Game