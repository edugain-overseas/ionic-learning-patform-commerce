import React, { ReactNode } from "react";
import {
  IonIcon,
  IonLabel,
  IonRippleEffect,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import HomeIcon from "../assets/icons/tabs/home.svg";
import CoursesIcon from "../assets/icons/tabs/courses.svg";
import MyProfileIcon from "../assets/icons/tabs/my-profile.svg";
import BasketIcon from "../assets/icons/tabs/basket.svg";

interface TabsTypes {
  children: ReactNode;
}

const Tabs: React.FC<TabsTypes> = ({ children }) => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content" animated>
        {children}
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="custom-tab-bar" id="main-content">
        <IonTabButton tab="home" href="/home" className="ion-activatable">
          <IonIcon src={HomeIcon} className="custom-tab-icon" />
          <IonLabel>Home</IonLabel>
          <IonRippleEffect></IonRippleEffect>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses" className="ion-activatable">
          <IonIcon src={CoursesIcon} className="custom-tab-icon" />
          <IonLabel>Courses</IonLabel>
          <IonRippleEffect></IonRippleEffect>
        </IonTabButton>
        <IonTabButton
          tab="profile"
          href="/my-profile"
          className="ion-activatable"
        >
          <IonIcon src={MyProfileIcon} className="custom-tab-icon" />
          <IonLabel>Profile</IonLabel>
          <IonRippleEffect></IonRippleEffect>
        </IonTabButton>
        <IonTabButton tab="basket" href="/basket" className="ion-activatable">
          <IonIcon src={BasketIcon} className="custom-tab-icon" />
          <IonLabel>Basket</IonLabel>
          <IonRippleEffect></IonRippleEffect>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
