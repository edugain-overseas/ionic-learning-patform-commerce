import { FC, useState } from "react";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import bellIcon from "../../assets/icons/bell-with-wave.svg";
import Header from "../../components/Header/Header";
import styles from "./Notifications.module.scss";

const NotificationsFallback = () => (
  <div className={styles.fallbackContainer}>
    <IonIcon src={bellIcon} />
    <p className={styles.title}>No Notifications</p>
    <p>We'll let you know when there will be something to update you.</p>
  </div>
);

const Notifications: FC = () => {
  const [notifications, setNotifications] = useState([]);

  const headerProps = {
    left: [{ name: "back" }],
    title: "Notifications",
  };
  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent>
        {notifications.length === 0 ? (
          <NotificationsFallback />
        ) : (
          notifications.map((notification) => <li>{notification}</li>)
        )}
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
