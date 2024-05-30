import { IonSpinner } from "@ionic/react";
import { FC } from "react";

const Spinner: FC = ({ ...props }) => {
  return <IonSpinner name="crescent" {...props} color="dark" />;
};

export default Spinner;
