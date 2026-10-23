import { useEffect, useState } from "react";
import { instance } from "../../http/instance";
import { convertSecondsToMinutesAndSeconds } from "../../utils/millisecondsToSrt";
import useTimer from "../../hooks/useTimer";
import styles from "./ExpiredAttemptsMessage.module.scss";

const ExpiredAttemptsMessage = ({
  testId,
  fetchAttempts,
  wrapperClassname = styles.wrapper,
}: {
  testId?: number;
  wrapperClassname?: string;
  fetchAttempts: () => Promise<void>;
}) => {
  const [time, setTime] = useState<number>(0);

  const { secondsLeft, start, reset } = useTimer({
    initialSeconds: time,
    onTimeEnd: fetchAttempts,
  });

  useEffect(() => {
    if (time) {
      reset();
      start();
    }
  }, [time]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await instance.get(
          `/student-test/status?test_id=${testId}`,
        );
        const secondsLeft = response.data.seconds_left;

        if (secondsLeft) {
          setTime(secondsLeft);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (testId) {
      fetchTime();
    }
  }, [testId]);

  const displayTime = convertSecondsToMinutesAndSeconds(secondsLeft);

  if (!secondsLeft) {
    return null;
  }

  return (
    <p className={wrapperClassname}>
      Your attempts have expired. You will receive new attempts in{" "}
      <span>
        {`${displayTime.minutes}`.padStart(2, "0")}:
        {`${displayTime.seconds}`.padStart(2, "0")}
      </span>
      .
    </p>
  );
};

export default ExpiredAttemptsMessage;
