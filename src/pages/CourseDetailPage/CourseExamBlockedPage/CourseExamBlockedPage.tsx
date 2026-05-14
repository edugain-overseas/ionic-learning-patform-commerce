import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { FC } from "react";
import Header from "../../../components/Header/Header";
import EmptyBasketIcon from "../../../assets/icons/empty_basket.svg";
import styles from "./CourseExamBlockedPage.module.scss";

const CourseExamBlockedPage: FC = () => {
  const headerProps = {
    left: [{ name: "back" }],
  };
  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent scrollY={false}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <IonIcon src={EmptyBasketIcon} />
            <span className={styles.emptyMessage}>
              This page will become available after completing the course and
              reaching the exam stage.
            </span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CourseExamBlockedPage;
