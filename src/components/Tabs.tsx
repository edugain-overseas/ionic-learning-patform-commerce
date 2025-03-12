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

const TABS: string[] = ["home", "courses", "profile", "basket"];

const Tabs: FC<TabsTypes> = ({ children }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabWillChange = (e: CustomEvent) => {
    const targetTab = e.detail.tab;

    const targetTabIndex = TABS.findIndex((tab) => tab === targetTab);
    const currentTab = TABS[currentTabIndex] as any;

    const direction = targetTabIndex > currentTabIndex ? "right" : "left";
    const ionRouterOutlet = document.querySelector(
      "ion-router-outlet"
    ) as HTMLElement;

    if (ionRouterOutlet) {
      const targetPage = ionRouterOutlet.children[targetTab] as HTMLElement;
      // const currentPage = ionRouterOutlet.children[currentTab] as HTMLElement;

      // if (currentPage) {
      //   tabsAnimations[`to${direction}`](currentPage).play();
      // }

      if (targetPage) {
        tabsAnimations[`from${direction}`](targetPage).play();
      }
    }
    setCurrentTabIndex(targetTabIndex);
  };

  return (
    <IonTabs>
      <IonRouterOutlet id="main-content">{children}</IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        className="custom-tab-bar"
        id="main-content"
        // onIonTabsWillChange={handleTabWillChange}
        onIonTabsDidChange={handleTabWillChange}
      >
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
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
