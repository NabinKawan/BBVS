import React, { ChangeEvent, useEffect, useState } from 'react';

// @ts-ignore

export default function ProgressBarController({ children }) {
  // The counter
  const [count, setCount] = useState<number>(0);
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(true);

  const [reload, setReload] = useState(false);

  useEffect(
    () => {
      // Your custom logic here
      setCount(count + 10);
      setReload(!reload)
    },
    [reload],
    // @ts-ignore
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  return children(count);
}
