import React from "react";
import { menuNav } from "../../constants/nav";
import {
  IonIcon,
  IonMenuToggle,
  IonRouterLink,
} from "@ionic/react";
import styles from "./Menu.module.scss";

const MenuNav = () => {
  return (
    <ul className={styles.menuNavList}>
      {menuNav.map((link) => (
        <li key={link.label}>
          <IonMenuToggle>
            <IonRouterLink
              routerLink={link.to}
              className={styles.menuNavLink}
              routerDirection="root"
            >
              <div className={styles.linkWrapper}>
                <IonIcon src={link.iconSrc} className={styles.navItemIcon} />
                <span className={styles.navItemLabel}>{link.label}</span>
              </div>
            </IonRouterLink>
          </IonMenuToggle>
        </li>
      ))}
    </ul>
  );
};

export default MenuNav;
