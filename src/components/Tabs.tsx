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
import { TabNameType, tabsData, TabType } from "../constants/nav";
import HomeIcon from "../assets/icons/nav/home.svg";
import CoursesIcon from "../assets/icons/nav/courses.svg";
import MyStudyIcon from "../assets/icons/nav/my-education.svg";
import MenuIcon from "../assets/icons/nav/menu.svg";
import BasketIcon from "./BasketIcon/BasketIcon";

interface TabsTypes {
  children: ReactNode;
}

type IconsType = Record<Exclude<TabNameType, "Basket">, string>;

const icons: IconsType = {
  Home: HomeIcon,
  "All Courses": CoursesIcon,
  "My Study": MyStudyIcon,
};

const renderTabIcon = (tab: TabType): ReactNode =>
  tab.label === "Basket" ? (
    <BasketIcon />
  ) : (
    <IonIcon src={icons[tab.label]} className="custom-tab-icon" />
  );

const Tabs: FC<TabsTypes> = ({ children }) => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content" animated={false}>
        {children}
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="custom-tab-bar" id="main-content">
        {tabsData.map((tab) => (
          <IonTabButton
            key={tab.href}
            tab={tab.label.toLocaleLowerCase()}
            href={tab.href}
            className="ion-activatable"
          >
            {renderTabIcon(tab)}
            <IonLabel>{tab.label}</IonLabel>
            <IonRippleEffect type="unbounded"></IonRippleEffect>
          </IonTabButton>
        ))}
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
