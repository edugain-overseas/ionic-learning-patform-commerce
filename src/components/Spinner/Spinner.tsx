import { IonSpinner } from "@ionic/react";
import { FC } from "react";

const Spinner: FC<{ color: string; className?: string }> = ({
  color = "dark",
  className,
}) => {
  return (
    <IonSpinner
      name="crescent"
      color={color}
      className={className ? className : ""}
    />
  );
};

export default Spinner;
