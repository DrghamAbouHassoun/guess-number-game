import { Button } from 'flowbite-react';
import React from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  increaseValue?: number;
}

const CounterInput = ({ value, onChange, max = 400, min = 0, increaseValue = 1 }: CounterInputProps) => {

  const handleChange = (newValue: number) => {
    if (newValue > max || newValue < min) {
      return;
    }
    onChange(Math.round(newValue * 10) / 10)
  }

  return (
    <div className="flex gap-1 w-full">
      <Button color="dark" onClick={() => handleChange(value - increaseValue)}>
        <FaCaretDown />
      </Button>
      <p className="bg-slate-800 p-2 flex-1 rounded-md border border-gray-300 min-w-[100px] text-center">{value}</p>
      <Button color="dark" onClick={() => handleChange(value + increaseValue)}>
        <FaCaretUp />
      </Button>
    </div>
  )
}

export default CounterInput