import { useEffect, useRef, useState } from "react";

export type TimerOptions = {
  initialSeconds: number;
  onTimeEnd?: () => void;
  onTick?: (secondsLeft: number) => void;
  interval?: number; // defaults to 1 second
};

const useTimer = ({
  initialSeconds,
  onTimeEnd,
  onTick,
  interval = 1000,
}: TimerOptions) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    stop(); // clear any existing intervals
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - interval / 1000;
        if (next <= 0) {
          stop();
          onTimeEnd?.();
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, interval);
  };

  const reset = (newTime: number = initialSeconds) => {
    stop();
    setSecondsLeft(newTime);
  };

  useEffect(() => {
    return () => stop(); // clear on unmount
  }, []);

  return {
    secondsLeft,
    start,
    stop,
    reset,
    isRunning: intervalRef.current !== null,
  };
};

export default useTimer;
