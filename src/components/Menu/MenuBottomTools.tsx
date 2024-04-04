import { IonIcon, IonMenuToggle, IonRouterLink } from "@ionic/react";
import SearchIcon from "../../assets/icons/menu/search.svg";
import SupportIcon from "../../assets/icons/menu/support.svg";
import styles from "./Menu.module.scss";

const MenuBottomTools = () => {
  return (
    <ul className={styles.menuNavList}>
      <li>
        <div className={styles.linkWrapper}>
          <IonIcon src={SearchIcon} className={styles.navItemIcon} />
          <span className={styles.navItemLabel}>Search</span>
        </div>
      </li>
      <li>
        <IonMenuToggle>
          <IonRouterLink
            routerLink="/support"
            routerDirection="root"
            className={styles.menuNavLink}
          >
            <div className={styles.linkWrapper}>
              <IonIcon src={SupportIcon} className={styles.navItemIcon} />
              <span className={styles.navItemLabel}>Support manager</span>
            </div>
          </IonRouterLink>
        </IonMenuToggle>
      </li>
    </ul>
  );
};

export default MenuBottomTools;
