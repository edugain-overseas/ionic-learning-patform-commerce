import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { useCountUp } from "react-countup";
import { platformStats, PlatformStatType } from "../../constants";
import { letterGrade } from "../../utils/letterGrade";
import { useObserver } from "../../hooks/useObserver";
import CoursesIcon from "../../assets/icons/homeStats/courses.svg";
import StudentsIcon from "../../assets/icons/homeStats/students.svg";
import ScoreIcon from "../../assets/icons/homeStats/score.svg";
import CertificatesIcon from "../../assets/icons/homeStats/certificates.svg";
import styles from "./HomeStats.module.scss";

const renderIcon = (name: string) => {
  switch (name) {
    case "courses":
      return CoursesIcon;
    case "students":
      return StudentsIcon;
    case "score":
      return ScoreIcon;
    case "certificates":
      return CertificatesIcon;
    default:
      return;
  }
};

const Stat: FC<{ stat: PlatformStatType; startCount: boolean }> = ({
  stat,
  startCount,
}) => {
  const valueRef = useRef(null);

  const formattingFn: Record<string, ((value: number) => string) | undefined> =
    {
      score: useCallback((value: number) => {
        const valuePostfix = letterGrade(value);
        return `${value} (${valuePostfix})`;
      }, []),
      courses: useCallback(
        (value: number) => `${value} ${value === 100 ? "+" : ""}`,
        [],
      ),
    };

  const { start } = useCountUp({
    ref: valueRef,
    start: 0,
    end: stat.value,
    duration: 3,
    startOnMount: false,
    formattingFn: formattingFn[stat.name],
    separator: " ",
  });

  useEffect(() => {
    if (startCount) {
      start();
    }
  }, [startCount]);

  return (
    <div className={styles.stat}>
      <IonIcon src={renderIcon(stat.name)} />
      <div className={styles.value} ref={valueRef}></div>
      <div
        className={styles.label}
        dangerouslySetInnerHTML={{ __html: stat.label }}
      ></div>
    </div>
  );
};

const HomeStats = () => {
  const [startCount, setStartCount] = useState(false);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      !startCount && setStartCount(true);
    }
  };

  const observerOptions: IntersectionObserverInit = {
    root: document.getElementById("home-content"),
    rootMargin: "0px",
    threshold: 0,
  };

  const sectionRef = useObserver<HTMLUListElement>(
    true,
    observerCallback,
    observerOptions,
  );

  return (
    <ul className={styles.stats} ref={sectionRef}>
      {platformStats.map((stat) => (
        <li key={stat.name}>
          <Stat stat={stat} startCount={startCount} />
        </li>
      ))}
    </ul>
  );
};

export default HomeStats;
