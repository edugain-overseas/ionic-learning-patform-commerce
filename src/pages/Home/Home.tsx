import { IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header/Header";
import HomeHero from "../../components/HomeHero/HomeHero";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import Auth from "../../components/Auth/Auth";
import styles from "./Home.module.scss";

const headerProps = {
  left: [{ name: "logo" }],
  right: [
    { name: "notification", onClick: () => {} },
    { name: "search", onClick: () => {} },
  ],
  mode: "transparent",
};

const Home: React.FC = () => {
  return (
    <IonPage className={styles.page} id="home">
      <Header {...headerProps} />
      <IonContent fullscreen className={styles.homeContent} scrollY={false}>
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.mainTitle}>Online learning</span>
            <span className={styles.secondaryWrapper}>
              is <span className={styles.pointRed}>now</span> in Your
            </span>
            <span className={styles.secondaryWrapper}>
              Hands
              <span className={styles.symbol}></span>
            </span>
          </div>
          <div className={styles.benefits}>
            <HomeHero />
          </div>
          <div className={styles.benefitsText}>
            <span>
              You will acquire the skills necessary to achieve success in
              today's business world.
            </span>
          </div>
          <HomeSearch />
        </div>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Home;
