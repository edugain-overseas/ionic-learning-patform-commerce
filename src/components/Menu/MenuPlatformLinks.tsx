import { platformLinks } from "../../constants/nav";
import { IonIcon, IonMenuToggle, IonRippleEffect } from "@ionic/react";
import styles from "./Menu.module.scss";
import { Capacitor } from "@capacitor/core";

const MenuPlatformLinks = () => {
  const platform = Capacitor.getPlatform();
  return (
    <ul className={styles.menuNavList} style={{ marginTop: "20rem" }}>
      {platformLinks.map((link) => {
        if (platform === link.platform) {
          return null;
        }
        return (
          <li key={link.label}>
            <IonMenuToggle>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={styles.menuNavLink}
              >
                <div className={styles.linkWrapper}>
                  <div className={styles.iconWrapper}>
                    <IonIcon
                      src={link.iconSrc}
                      className={styles.platformIcon}
                    />
                  </div>
                  <span className={styles.navItemLabel}>{link.label}</span>
                </div>
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </a>
            </IonMenuToggle>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuPlatformLinks;
