import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import {
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonPage,
} from "@ionic/react";
import MenuIcon from "../assets/icons/tabs/menu.svg";
import Tabs from "./Tabs";
import Menu from "./Menu/Menu";
import Home from "../pages/Home/Home";
import UserProfile from "../pages/UserProfile/UserProfile";
import Courses from "../pages/Courses/Courses";
import CategoryDetailPage from "../pages/CategoryDetailPage/CategoryDetailPage";
import CourseDetailPage from "../pages/CourseDetailPage/CourseDetailPage";
import AboutIEU from "../pages/AboutIEU/AboutIEU";
import Instructions from "../pages/Instructions/Instructions";
import NotFound from "../pages/NotFound/NotFound";
import Basket from "../pages/Basket/Basket";

const Router: React.FC = () => {
  return (
    <>
      <IonReactRouter>
        <Menu />
        <IonPage id="main-content" className="main">
          <Tabs>
            <Route path="/home" component={Home} exact/>
            <Route path="/my-profile" component={UserProfile} exact />
            <Route path="/courses" component={Courses} exact />
            <Route path="/basket" component={Basket} exact />
            <Route path="/aboutIEU" component={AboutIEU} exact />
            <Route path="/instructions" component={Instructions} exact />

            <Route
              path="/courses/category/:categoryId"
              component={CategoryDetailPage}
              exact
            />
            <Route
              path="/courses/course/:courseId"
              component={CourseDetailPage}
            />

            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route component={NotFound} />
          </Tabs>
          <IonMenuToggle className="custom-toggle-menu">
            <IonIcon src={MenuIcon} className="custom-tab-icon" />
            <IonLabel>Menu</IonLabel>
          </IonMenuToggle>
        </IonPage>
      </IonReactRouter>
    </>
  );
};

export default Router;
