import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { instance } from "../../../http/instance";
import Success from "./Success";
import Cancel from "./Cancel";
import Spinner from "../../../components/Spinner/Spinner";
import { useBasket } from "../../../context/BasketContext";
import { IonPage } from "@ionic/react";

type Status = "success" | "cancel";

const CourseBuyStatusPage: FC = () => {
  const [coursesIds, setCoursesIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const basketInterface = useBasket();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") as Status;
  const sessionId = queryParams.get("session_id") as string;
  const itemsIds = JSON.parse(
    queryParams.get("items_ids") as string
  ) as number[];

  console.log(sessionId, status, itemsIds);

  useEffect(() => {
    const getCoursesData = async () => {
      try {
        setIsLoading(true);
        const { data } = await instance.get(
          `/stripe/success?session_id=${sessionId}`
        );
        const dataKeys = Object.keys(data);

        dataKeys.forEach((key) => {
          if (key === "student_id") {
            return;
          }
          const courseId = +data[key];
          basketInterface?.toggleItemToBasket(courseId);
          setCoursesIds((prev) => [...prev, data[key]]);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "success" && sessionId) {
      getCoursesData();
    }
    console.log(itemsIds);
    
    if (status === "success" && itemsIds) {
      itemsIds.forEach((itemId) => {
        basketInterface?.toggleItemToBasket(itemId);        
      });
      setCoursesIds(itemsIds);
    }
  }, [status, sessionId]);

  if (status === "cancel") {
    return <Cancel />;
  }
  
  return (
    <IonPage>
      {isLoading ? <Spinner /> : <Success coursesIds={coursesIds} />}
    </IonPage>
  );
};

export default CourseBuyStatusPage;
