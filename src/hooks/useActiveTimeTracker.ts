import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { instance } from "../http/instance";

const UPDATE_INTERVAL = 60_000;

export const useActiveTimeTracker = ({
  accessToken,
  initialTime = 0,
}: {
  accessToken?: string | null;
  initialTime?: number;
}) => {
  const [activeTime, setActiveTime] = useState(initialTime);

  const isActiveRef = useRef(true);

  const totalTimeRef = useRef(initialTime);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // sync initial value
  useEffect(() => {
    setActiveTime(initialTime);
    totalTimeRef.current = initialTime;
  }, [initialTime]);

  const sendTimeToServer = async (time: number) => {
    if (!accessToken || time <= 0) return;

    try {
      await instance.put("/user/update/time", null, {
        params: { time },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // web visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // native app visibility
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listener: Awaited<ReturnType<typeof App.addListener>>;

    const setupListener = async () => {
      listener = await App.addListener("appStateChange", ({ isActive }) => {
        isActiveRef.current = isActive;
      });
    };

    setupListener();

    return () => {
      listener?.remove();
    };
  }, []);

  // timer
  useEffect(() => {
    if (!accessToken) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(async () => {
      if (!isActiveRef.current) return;

      totalTimeRef.current += UPDATE_INTERVAL;

      setActiveTime(totalTimeRef.current);

      await sendTimeToServer(UPDATE_INTERVAL);
    }, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [accessToken]);

  return {
    activeTime,
    setActiveTime,
  };
};
