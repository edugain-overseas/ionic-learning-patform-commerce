import { FC } from "react";
import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { IonRefresherCustomEvent } from "@ionic/core";
import "./PageRefresher.scss";

const PageRefresher: FC<{
  onRefresh: () => Promise<void>;
  refreshingText?: string;
}> = ({ onRefresh, refreshingText }) => {
  const handleRefresh = (
    event: IonRefresherCustomEvent<RefresherEventDetail>
  ) => {
    onRefresh().finally(() => event.detail.complete());
  };

  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={handleRefresh}
      closeDuration="250ms"
    >
      <IonRefresherContent
        refreshingSpinner="crescent"
        refreshingText={refreshingText}
        className="page-refresher"
        pullingText='Pull to refresh'
        pullingIcon={null}
      ></IonRefresherContent>
    </IonRefresher>
  );
};

export default PageRefresher;
