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
  containerClassname?: string;
}> = ({ onRefresh, refreshingText, containerClassname='refresher' }) => {
  const handleRefresh = (
    event: IonRefresherCustomEvent<RefresherEventDetail>
  ) => {
    onRefresh().finally(() => event.detail.complete());
  };

  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={handleRefresh}
      closeDuration="500ms"
      className={containerClassname}
      pullMax={300}
      pullMin={100}
    >
      <IonRefresherContent
        refreshingSpinner="crescent"
        refreshingText={refreshingText}
        className="page-refresher"
        pullingText="Pull to refresh"
        pullingIcon={null}
      ></IonRefresherContent>
    </IonRefresher>
  );
};

export default PageRefresher;
