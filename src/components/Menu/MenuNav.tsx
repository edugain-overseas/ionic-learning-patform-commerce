import {
  IonIcon,
  IonMenuToggle,
  IonRippleEffect,
  IonRouterLink,
} from "@ionic/react";
import { menuNav } from "../../constants/nav";
import styles from "./Menu.module.scss";

const MenuNav = () => {
  return (
    <ul className={styles.menuNavList}>
      {menuNav.map((link) => (
        <li key={link.label}>
          <IonMenuToggle>
            <IonRouterLink
              routerLink={link.to}
              className={`${styles.menuNavLink} ion-activatable`}
              routerDirection="none"
            >
              <div className={styles.linkWrapper}>
                <IonIcon src={link.iconSrc} className={styles.navItemIcon} />
                <span className={styles.navItemLabel}>{link.label}</span>
              </div>
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonRouterLink>
          </IonMenuToggle>
        </li>
      ))}
    </ul>
  );
};

export default MenuNav;
