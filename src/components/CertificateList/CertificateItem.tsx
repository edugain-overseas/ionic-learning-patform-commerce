import { IonRouterLink } from "@ionic/react";
import { CertificateItemDataType } from "./CertificateList";
import styles from "./CertificateList.module.scss";

const CertificateItem = ({ data }: { data: CertificateItemDataType }) => {
  return (
    <div className={styles.itemContainer}>
      <IonRouterLink
        routerLink={data.link}
        routerDirection="forward"
        className={styles.certificateLink}
      >
        <h4 className={styles.certificateTitle}>{data.name}</h4>
      </IonRouterLink>
      <div className={styles.certificateContentContainer}>
        <ul>
          <li>{data.type}</li>
        </ul>
      </div>
    </div>
  );
};

export default CertificateItem;
