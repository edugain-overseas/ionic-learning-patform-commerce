import { IonIcon } from "@ionic/react";
import styles from "./Tag.module.scss";

export type TagProps = {
  text: string;
  icon?: string;
  iconSlot?: "start" | "end";
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
};

const Tag = ({
  text,
  icon,
  iconSlot = "start",
  textColor,
  backgroundColor,
  borderColor,
  className = "",
}: TagProps) => {
  return (
    <div
      className={`${styles.tagContainer} ${className}`}
      style={{
        flexDirection: iconSlot === "start" ? "row" : "row-reverse",
        borderColor: borderColor,
        color: textColor,
        backgroundColor: backgroundColor,
      }}
    >
      {icon && <IonIcon src={icon} />} <span>{text}</span>
    </div>
  );
};

export default Tag;
