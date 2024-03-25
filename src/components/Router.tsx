import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import Tabs from "./Tabs";
import Home from "../pages/Home/Home";
import UserProfile from "../pages/UserProfile/UserProfile";
import Courses from "../pages/Courses/Courses";
import Menu from "../pages/Menu/Menu";
import CategoryDetailPage from "../pages/CategoryDetailPage/CategoryDetailPage";

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <Tabs>
        <IonRouterOutlet animated>
          <Route path="/home" component={Home} exact />
          <Route path="/my-profile" component={UserProfile} exact />
          <Route path="/courses" component={Courses} exact />
          <Route
            path="/courses/category/:categoryId"
            component={CategoryDetailPage}
            exact
          />
          <Route path="/basket" component={Courses} exact />
          <Route path="/menu" component={Menu} exact />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </Tabs>
    </IonReactRouter>
  );
};

export default Router;
