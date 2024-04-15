import { IonContent, IonIcon, IonImg, IonPage } from "@ionic/react";
import { useState } from "react";
import benefits from "../../assets/images/home-slider-bg.png";
import userIcon from "../../assets/icons/tabs/my-profile.svg";
import singInIcon from "../../assets/icons/auth/sing-in.svg";
import search from "../../assets/icons/header/search.svg";
import Header from "../../components/Header/Header";
import CommonButton from "../../components/CommonButton/CommonButton";
import InsetBtn from "../../components/InsetBtn/InsetBtn";
import LoginForm from "../../components/Auth/LoginForm";
import styles from "./Home.module.scss";
import SingupForm from "../../components/Auth/SingupForm";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <IonPage className={styles.page}>
      <Header
        left={["logo"]}
        right={["notification", "search"]}
        mode="transparent"
      />
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
            <IonImg src={benefits} />
          </div>
          <div className={styles.benefitsText}>
            <span>
              You will acquire the skills necessary to achieve success in
              today's business world.
            </span>
          </div>
          <div className={styles.searchbar}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Search our courses..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <InsetBtn
              width="32px"
              height="32px"
              backgroundColor="#7E8CA8"
              icon={<IonIcon src={search} className={styles.searchbarIcon} />}
            />
          </div>
        </div>
        <div className={styles.authPanel}>
          <CommonButton
            width={104}
            height={32}
            borderRadius={5}
            color="#fcfcfc"
            backgroundColor="#d00000"
            label="Sing up"
            icon={<IonIcon src={userIcon} className={styles.btnIcon} />}
            onClick={() => {}}
            id="sing-up"
          />
          <CommonButton
            width={104}
            height={32}
            borderRadius={5}
            color="#fcfcfc"
            backgroundColor="#001C54"
            label="Sing in"
            icon={<IonIcon src={singInIcon} className={styles.btnIcon} />}
            onClick={() => {}}
            id="sing-in"
          />
        </div>

        <SheetModalAuto trigger="sing-up">
          <SingupForm />
        </SheetModalAuto>
        <SheetModalAuto trigger="sing-in">
          <LoginForm />
        </SheetModalAuto>
      </IonContent>
    </IonPage>
  );
};

export default Home;
