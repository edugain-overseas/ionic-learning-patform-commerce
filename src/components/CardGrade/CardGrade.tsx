import { FC } from "react";
import styles from "./CardGrade.module.scss";
import GradeIcon from "./GradeIcon";
import { letterGrade } from "../../utils/letterGrade";

const CardGrade: FC<{
  grade?: number;
  maxGrade?: number;
  showLetter?: boolean;
}> = ({ grade = 0, maxGrade = 200, showLetter = true }) => {

  return (
    <div className={styles.wrapper}>
      {showLetter && <GradeIcon letterGrade={letterGrade(grade)} classname={styles.letterIcon}/>}
      <div className={styles.infoWrapper}>
        <span className={styles.maxGradeLabel}>Grade</span>
        <div className={styles.gradeWrapper}>
          <span className={styles.userGrade}>{grade}</span>
          <span className={styles.divider}>\</span>
          <span className={styles.maxGrade}>{maxGrade}</span>
        </div>
      </div>
    </div>
  );
};

export default CardGrade;
