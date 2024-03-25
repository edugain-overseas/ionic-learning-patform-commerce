import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import React from "react";
import HomeIcon from "../assets/icons/tabs/home.svg";
import CoursesIcon from "../assets/icons/tabs/courses.svg";
import MyProfileIcon from "../assets/icons/tabs/my-profile.svg";
import BasketIcon from "../assets/icons/tabs/basket.svg";
import MenuIcon from "../assets/icons/tabs/menu.svg";

const TabBar: React.FC = () => {
  return (
    <IonTabBar  className="custom-tab-bar">
      <IonTabButton tab="home" href="/home">
        <IonIcon src={HomeIcon} className="custom-tab-icon" />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="courses" href="/courses">
        <IonIcon src={CoursesIcon} className="custom-tab-icon" />
        <IonLabel>Courses</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/my-profile">
        <IonIcon src={MyProfileIcon} className="custom-tab-icon" />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
      <IonTabButton tab="basket" href="/basket">
        <IonIcon src={BasketIcon} className="custom-tab-icon" />
        <IonLabel>Basket</IonLabel>
      </IonTabButton>
      <IonTabButton tab="menu" href="/menu">
        <IonIcon src={MenuIcon} className="custom-tab-icon" />
        <IonLabel>Menu</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;
