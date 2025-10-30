import { FC, ReactNode } from "react";
import {
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRippleEffect,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import HomeIcon from "../assets/icons/tabs/home.svg";
import CoursesIcon from "../assets/icons/tabs/courses.svg";
import MyProfileIcon from "../assets/icons/tabs/my-profile.svg";
import MenuIcon from "../assets/icons/tabs/menu.svg";
import BasketIcon from "./BasketIcon/BasketIcon";

interface TabsTypes {
  children: ReactNode;
}

const Tabs: FC<TabsTypes> = ({ children }) => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content" animated={false}>{children}</IonRouterOutlet>
      <IonTabBar slot="bottom" className="custom-tab-bar" id="main-content">
        <IonTabButton tab="home" href="/home" className="ion-activatable">
          <IonIcon src={HomeIcon} className="custom-tab-icon" />
          <IonLabel>Home</IonLabel>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses" className="ion-activatable">
          <IonIcon src={CoursesIcon} className="custom-tab-icon" />
          <IonLabel>Courses</IonLabel>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonTabButton>
        <IonTabButton
          tab="profile"
          href="/my-profile"
          className="ion-activatable"
        >
          <IonIcon src={MyProfileIcon} className="custom-tab-icon" />
          <IonLabel>Profile</IonLabel>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonTabButton>
        <IonTabButton tab="basket" href="/basket" className="ion-activatable">
          <BasketIcon />
          <IonLabel>Basket</IonLabel>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonTabButton>
        <IonTabButton className="ion-activatable">
          <IonMenuToggle
            className="menu-button-inner"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={MenuIcon} className="custom-tab-icon" />
            <IonLabel>Menu</IonLabel>
            <IonRippleEffect type="unbounded"></IonRippleEffect>
          </IonMenuToggle>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
