import { FC, ReactNode, useState } from "react";
import {
  IonIcon,
  IonLabel,
  IonRippleEffect,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { tabsAnimations } from "../animations/tabsAnimations";
import HomeIcon from "../assets/icons/tabs/home.svg";
import CoursesIcon from "../assets/icons/tabs/courses.svg";
import MyProfileIcon from "../assets/icons/tabs/my-profile.svg";
import BasketIcon from "./BasketIcon/BasketIcon";

interface TabsTypes {
  children: ReactNode;
}

const TABS = ["home", "courses", "profile", "basket"];

const Tabs: FC<TabsTypes> = ({ children }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabWillChange = (e: CustomEvent) => {
    const targetTab = e.detail.tab;
    const targetTabIndex = TABS.findIndex((tab) => tab === targetTab);

    const direction = targetTabIndex > currentTabIndex ? "right" : "left";
    const ionRouterOutlet = document.querySelector("ion-router-outlet");

    if (ionRouterOutlet) {
      const targetPage = ionRouterOutlet.children[targetTab];

      tabsAnimations[direction](
        targetPage ? targetPage : ionRouterOutlet
      ).play();
    }
    setCurrentTabIndex(targetTabIndex);
  };

  return (
    <IonTabs>
      <IonRouterOutlet id="main-content" animated>
        {children}
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        className="custom-tab-bar"
        id="main-content"
        onIonTabsWillChange={handleTabWillChange}
      >
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
          {/* <IonIcon src={BasketIcon} className="custom-tab-icon" /> */}
          <BasketIcon />
          <IonLabel>Basket</IonLabel>
          <IonRippleEffect></IonRippleEffect>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
