import { IonIcon, IonMenu, IonMenuToggle } from "@ionic/react";
import Close from "../../assets/icons/menu/close.svg";
import Logout from "../../assets/icons/menu/logout.svg";
import Settings from "../../assets/icons/menu/settings.svg";
import MenuBottomTools from "./MenuBottomTools";
import UserInfo from "../UserInfo/UserInfo";
import MenuNav from "./MenuNav";
import styles from "./Menu.module.scss";
import InsetBtn from "../InsetBtn/InsetBtn";
import { useUser } from "../../context/UserContext";
import { useRef } from "react";

const Menu = () => {
  const isUserLoggedIn = useUser()?.user.accessToken !== null;
  const menuRef = useRef<HTMLIonMenuElement>(null);
  const logout = useUser()?.logout;

  const handleLogout = async () => {
    if (logout) {
      try {
        await logout();
        menuRef.current?.close();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <IonMenu
      type="reveal"
      menuId="main"
      contentId="main-content"
      className="custom-menu"
      ref={menuRef}
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
                  <button onClick={handleLogout}>
                    <div className={styles.iconWrapper}>
                      <IonIcon src={Logout} className={styles.footerIcon} />
                    </div>
                    <span>Log out</span>
                  </button>
                </li>
              )}
              <li>
                <button>
                  <IonIcon src={Settings} className={styles.footerIcon} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
            <div className={styles.closeBtn}>
              <IonMenuToggle>
                <InsetBtn
                  icon={<IonIcon src={Close} />}
                  width="32px"
                  height="32px"
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
