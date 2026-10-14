import { matchPath, Redirect, Route } from "react-router";
import { IonPage, IonRouterOutlet } from "@ionic/react";
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
import Search from "../pages/Search/Search";
import CourseBuyStatusPage from "../pages/CourseDetailPage/CourseBuyStatusPage/CourseBuyStatusPage";
import Support from "../pages/Support/Support";
import MyStudy from "../pages/MyStudy/MyStudy";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";
import Contacts from "../pages/Contacts/Contacts";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";

const Router: React.FC = () => {
  return (
    <>
      <Menu />
      <IonPage id="main-content" className="main">
        <IonRouterOutlet id="main-content" animated={false}>
          <Tabs>
            <Route path="/home" component={Home} exact />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/my-profile" component={UserProfile} exact />
            <Route path="/courses" component={Courses} exact />
            <Route path="/my-education" component={MyStudy} exact />
            <Route path="/basket" component={Basket} exact />

            <Route path="/about" component={AboutIEU} exact />
            <Route path="/instructions" component={Instructions} exact />
            <Route path="/contacts" component={Contacts} exact />
            <Route path="/privacy-policy" component={PrivacyPolicyPage} exact />
            <Route path="/search" component={Search} />
            <Route path="/support" component={Support} />
            <Route path="/settings" component={Settings} />
            <Route path="/notifications" component={Notifications} />
            <Route
              path="/category/:categoryId"
              component={CategoryDetailPage}
            />
            <Route path="/course/:courseId" component={CourseDetailPage} />
            <Route path="/payment" component={CourseBuyStatusPage} exact />

            <Route path="/login" render={() => <Redirect to="/home" />} />
            <Route path="/register" render={() => <Redirect to="/home" />} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route render={() => <Redirect to="/home" />} />
          </Tabs>
        </IonRouterOutlet>
      </IonPage>
    </>
  );
};

export default Router;
