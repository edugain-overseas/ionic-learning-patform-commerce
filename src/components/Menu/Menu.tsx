import { IonIcon, IonMenu, IonMenuToggle, IonRippleEffect } from "@ionic/react";
import { useRef, useState } from "react";
import { changeStausBarTheme } from "../../hooks/useStatusBar";
import { useUser } from "../../context/UserContext";
import {
  menuEnterPageAnimation,
  menuLeavePageAnimation,
} from "../../animations/menuAnimations";
import Close from "../../assets/icons/menu/close.svg";
import Logout from "../../assets/icons/menu/logout.svg";
import Settings from "../../assets/icons/menu/settings.svg";
import MenuBottomTools from "./MenuBottomTools";
import UserInfo from "../UserInfo/UserInfo";
import MenuNav from "./MenuNav";
import InsetBtn from "../InsetBtn/InsetBtn";
import Spinner from "../Spinner/Spinner";
import styles from "./Menu.module.scss";

const Menu = () => {
  const isUserLoggedIn = useUser()?.user.accessToken !== null;
  const menuRef = useRef<HTMLIonMenuElement>(null);
  const logout = useUser()?.logout;
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (logout) {
      setIsLoading(true);
      try {
        await logout();
        menuRef.current?.close();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMenuWillOpen = () => {
    document.querySelectorAll("ion-modal").forEach((modal) => {
      modal.style.setProperty("scale", "0");
    });

    const baseEl = document.getElementById("main-content");
    baseEl?.style.setProperty("border-radius", "16rem");
    menuEnterPageAnimation(baseEl!).play();
  };

  const handleMenuDidOpen = () => {
    document.querySelectorAll("ion-modal").forEach((modal) => {
      modal.style.setProperty(
        "transition",
        "scale var(--custom-tr-time-min) ease-in-out 500ms"
      );
    });

    // status bar theme toggle
    changeStausBarTheme("Dark");
  };

  const handleMenuDidClose = () => {
    document.querySelectorAll("ion-modal").forEach((modal) => {
      modal.style.setProperty("scale", "1");
      modal.style.removeProperty("transition");
    });

    const baseEl = document.getElementById("main-content");
    baseEl?.style.setProperty("border-radius", "0");

    //status bar theme toggle
    changeStausBarTheme("Light");
  };

  const handleMenuWillClose = () => {
    const baseEl = document.getElementById("main-content");
    menuLeavePageAnimation(baseEl!).play();
  };

  return (
    <IonMenu
      type="reveal"
      menuId="main"
      contentId="main-content"
      className="custom-menu"
      ref={menuRef}
      swipeGesture={false}
      onIonWillOpen={handleMenuWillOpen}
      onIonDidClose={handleMenuDidClose}
      onIonDidOpen={handleMenuDidOpen}
      onIonWillClose={handleMenuWillClose}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <UserInfo />
        </div>
        <div className={styles.navPanel}>
          <div className={styles.navWrapper}>
            <MenuNav />
          </div>
          <MenuBottomTools />
        </div>
        <div className={styles.footer}>
          <div className={styles.footerTools}>
            <ul className={styles.footerNavItems}>
              {isUserLoggedIn && (
                <li>
                  <button onClick={handleLogout} className="ion-activatable">
                    <div className={styles.iconWrapper}>
                      {isLoading ? (
                        <Spinner color="dark" />
                      ) : (
                        <IonIcon src={Logout} className={styles.footerIcon} />
                      )}
                    </div>
                    <span>Log out</span>
                    <IonRippleEffect type="unbounded"></IonRippleEffect>
                  </button>
                </li>
              )}
              <li>
                <button className="ion-activatable">
                  <IonIcon src={Settings} className={styles.footerIcon} />
                  <span>Settings</span>
                  <IonRippleEffect type="unbounded"></IonRippleEffect>
                </button>
              </li>
            </ul>
            <div className={styles.closeBtn}>
              <IonMenuToggle>
                <InsetBtn
                  icon={<IonIcon src={Close} />}
                  width="32rem"
                  height="32rem"
                  backgroundColor="#B80101"
                />
              </IonMenuToggle>
            </div>
          </div>
        </div>
      </div>
    </IonMenu>
  );
};

export default Menu;
