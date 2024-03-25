import { IonContent, IonModal, IonPage } from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import Header from "../../components/Header/Header";
import styles from "./CategoryDetailPage.module.scss";
import TabBar from "../../components/TabBar";

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <IonPage className={styles.papeWrapper}>
      <Header
        title="My Courses"
        secondary={true}
        left={["back"]}
        right={["notification", "list-style"]}
      />
      <IonContent>
        <div>CategotyDetaiPage with id {`${categoryId}`}</div>
      </IonContent>
      <IonModal
        className={styles.modal}
        isOpen={true}
        initialBreakpoint={0.7}
        breakpoints={[0.7, 0.9]}
        showBackdrop={false}
        keyboardClose={false}
        // canDismiss={false}
      >
        <IonContent>Content</IonContent>
      </IonModal>
    </IonPage>
  );
};

export default CategoryDetailPage;
