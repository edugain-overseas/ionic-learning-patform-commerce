import {
  IonIcon,
  IonMenuToggle,
  IonRippleEffect,
  IonRouterLink,
} from "@ionic/react";
import SearchIcon from "../../assets/icons/menu/search.svg";
import SupportIcon from "../../assets/icons/menu/support.svg";
import styles from "./Menu.module.scss";

const MenuBottomTools = () => {
  return (
    <ul className={styles.menuNavList}>
      <li>
        <IonMenuToggle>
          <IonRouterLink
            routerLink="/search"
            routerDirection="root"
            className={`${styles.menuNavLink} ion-activatable`}
          >
            <div className={styles.linkWrapper}>
              <IonIcon src={SearchIcon} className={styles.navItemIcon} />
              <span className={styles.navItemLabel}>Search</span>
            </div>
            <IonRippleEffect type="unbounded"></IonRippleEffect>
          </IonRouterLink>
        </IonMenuToggle>
      </li>
      <li>
        <IonMenuToggle>
          <IonRouterLink
            routerLink="/support"
            routerDirection="root"
            className={`${styles.menuNavLink} ion-activatable`}
          >
            <div className={styles.linkWrapper}>
              <IonIcon src={SupportIcon} className={styles.navItemIcon} />
              <span className={styles.navItemLabel}>Support manager</span>
            </div>
            <IonRippleEffect type="unbounded"></IonRippleEffect>
          </IonRouterLink>
        </IonMenuToggle>
      </li>
    </ul>
  );
};

export default MenuBottomTools;
