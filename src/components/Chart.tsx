"use client";
import React, { useEffect, useRef } from 'react'

interface ChartProps {
  value: number;
}

const Chart = ({ value }: ChartProps) => {
  const canvRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath()
        context.moveTo(10, 100);
        context.quadraticCurveTo(10, 10, 50, 10);
        context.stroke();
      }
    }
  }, [])

  return (
    // <canvas ref={canvRef} width={500} height={500} className='bg-white'></canvas>
    <p>{value}</p>
  )
}

export default Chart