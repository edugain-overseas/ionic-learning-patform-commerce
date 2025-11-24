import { IonRouterLink } from "@ionic/react";
import { CertificateItemDataType } from "./CertificateList";
import TagList from "./TagList";
import styles from "./CertificateList.module.scss";
import Buttons from "./Buttons";

const CertificateItem = ({ data }: { data: CertificateItemDataType }) => {
  return (
    <div
      className={`${styles.itemContainer} ${
        styles[data.type + "CertificateItem"]
      }`}
    >
      <IonRouterLink
        routerLink={data.link}
        routerDirection="forward"
        className={styles.certificateLink}
      >
        <h4 className={styles.certificateTitle}>{data.name}</h4>
      </IonRouterLink>
      <div className={styles.certificateContentContainer}>
        <TagList data={data} />
        <Buttons data={data} />
      </div>
    </div>
  );
};

export default CertificateItem;
