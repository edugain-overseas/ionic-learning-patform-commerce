import { FC } from "react";
import gradeAIcon from "../../assets/icons/gradeA.svg";
import styles from "./CardGrade.module.scss";

const CardGrade: FC<{ grade?: number; maxGrade?: number }> = ({
  grade = 0,
  maxGrade = 200,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={gradeAIcon} />
      <div className={styles.infoWrapper}>
        {/* <div> */}
        <span className={styles.userGrade}>
          {`${grade || 0}`.padStart(3, "0")}{" "}
        </span>
        <span className={styles.divider}>\</span>
        <div className={styles.maxGradeWrapper}>
          <span className={styles.maxGradeLabel}>Grade</span>
          <span className={styles.maxGrade}>{maxGrade}</span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CardGrade;
