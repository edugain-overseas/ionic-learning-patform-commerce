import { FC, ReactNode} from "react";
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
import HomeIcon from "../assets/icons/tabs/home.svg";
import CoursesIcon from "../assets/icons/tabs/courses.svg";
import MyProfileIcon from "../assets/icons/tabs/my-profile.svg";
import MenuIcon from "../assets/icons/tabs/menu.svg";
import BasketIcon from "./BasketIcon/BasketIcon";

interface TabsTypes {
  children: ReactNode;
}

type IconsType = Record<Exclude<TabNameType, "basket">, string>;

const icons: IconsType = {
  home: HomeIcon,
  courses: CoursesIcon,
  "my-profile": MyProfileIcon,
};

const renderTabIcon = (tab: TabType): ReactNode =>
  tab.label === "basket" ? (
    <BasketIcon />
  ) : (
    <IonIcon src={icons[tab.label]} className="custom-tab-icon" />
  );

const renderTabLabel = (tab: TabType): ReactNode => (
  <IonLabel>{tab.label === "my-profile" ? "profile" : tab.label}</IonLabel>
);

const tabOrder = ["home", "courses", "my-profile", "basket"];

const Tabs: FC<TabsTypes> = ({ children }) => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content" animated={false}>
        {children}
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="custom-tab-bar" id="main-content">
        {tabsData.map((tab) => (
          <IonTabButton
            key={tab.label}
            tab={tab.label}
            href={tab.href}
            className="ion-activatable"
          >
            {renderTabIcon(tab)}
            {renderTabLabel(tab)}
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
