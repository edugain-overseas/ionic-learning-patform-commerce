import { FC, useEffect } from "react";
import { useLocation } from "react-router";
import Success from "./Success";
import Cancel from "./Cancel";
import { useBasket } from "../../../context/BasketContext";
import { IonPage } from "@ionic/react";

type Status = "success" | "cancel";

const CourseBuyStatusPage: FC = () => {
  const basketInterface = useBasket();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") as Status;

  useEffect(() => {
    if (status === "success") {
      basketInterface?.clearBasket();
    }
  }, [status]);

  return (
    <IonPage>
      {status === "success" && <Success />}
      {status === "cancel" && <Cancel />}
    </IonPage>
  );
};

export default CourseBuyStatusPage;
