import React from 'react';

interface RoundedProgressBarProps {
  barColor: string;
  fillPercentage: number;
  height?: number;
}

export default function RoundedProgressBar({
  barColor,
  fillPercentage,
  height = 8,
}: RoundedProgressBarProps) {
  return (
    <div className={`flex rounded-full  bg-gray-100 w-full`} style={{ height: `${height}px` }}>
      <div
        className={`rounded-full ${barColor} h-[${height}] `}
        style={{ width: `${fillPercentage}%`, height: `${height}px` }}
      ></div>
    </div>
  );
}
