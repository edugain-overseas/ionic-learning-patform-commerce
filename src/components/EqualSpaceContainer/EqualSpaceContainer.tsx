import { FC, ReactNode } from "react";
import styles from "./EqualSpaceContainer.module.scss";

type EqualSpaceContainerProps = {
  leftItem: ReactNode;
  rightItem: ReactNode;
  containerClassname?: string;
};

const EqualSpaceContainer: FC<EqualSpaceContainerProps> = ({
  leftItem,
  rightItem,
  containerClassname,
}) => {
  return (
    <div
      className={`${styles.container} ${
        containerClassname ? containerClassname : ""
      }`}
    >
      <div className={styles.start}>{leftItem}</div>
      <div className={styles.end}>{rightItem}</div>
    </div>
  );
};

export default EqualSpaceContainer;
