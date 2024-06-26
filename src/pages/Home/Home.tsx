import { IonContent, IonIcon, IonImg, IonPage } from "@ionic/react";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import benefits from "../../assets/images/home-slider-bg.png";
import userIcon from "../../assets/icons/tabs/my-profile.svg";
import singInIcon from "../../assets/icons/auth/sing-in.svg";
import search from "../../assets/icons/header/search.svg";
import Header from "../../components/Header/Header";
import CommonButton from "../../components/CommonButton/CommonButton";
import InsetBtn from "../../components/InsetBtn/InsetBtn";
import LoginForm from "../../components/Auth/LoginForm";
import SingupForm from "../../components/Auth/SingupForm";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";
import PasswordRecoveryForm from "../../components/Auth/PasswordRecoveryForm";
import UserActivationForm from "../../components/Auth/UserActivationForm";
import EqualSpaceContainer from "../../components/EqualSpaceContainer/EqualSpaceContainer";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const accessToken = useUser()?.user.accessToken;

  const [modals, setModals] = useState<
    {
      name: string;
      ref: React.RefObject<HTMLIonModalElement> | null;
    }[]
  >([
    { name: "sing-up", ref: null },
    { name: "sing-in", ref: null },
    { name: "password-recovery", ref: null },
  ]);
  const [searchValue, setSearchValue] = useState("");

  const headerProps = {
    left: [{ name: "logo" }],
    right: [
      { name: "notification", onClick: () => {} },
      { name: "search", onClick: () => {} },
    ],
    mode: "transparent",
  };

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
              width="32rem"
              height="32rem"
              backgroundColor="#7E8CA8"
              icon={<IonIcon src={search} className={styles.searchbarIcon} />}
            />
          </div>
        </div>
        {!accessToken && (
          <>
            <div className={styles.authPanel}>
              <EqualSpaceContainer
                leftItem={
                  <CommonButton
                    width={104}
                    height={32}
                    borderRadius={5}
                    color="#fcfcfc"
                    backgroundColor="#d00000"
                    label="Sing up"
                    icon={<IonIcon src={userIcon} className={styles.btnIcon} />}
                    onClick={() => {
                      modals
                        .find((modal) => modal.name === "sing-up")
                        ?.ref?.current?.present();
                    }}
                  />
                }
                rightItem={
                  <CommonButton
                    width={104}
                    height={32}
                    borderRadius={5}
                    color="#fcfcfc"
                    backgroundColor="#001C54"
                    label="Sing in"
                    icon={
                      <IonIcon src={singInIcon} className={styles.btnIcon} />
                    }
                    onClick={() => {
                      modals
                        .find((modal) => modal.name === "sing-in")
                        ?.ref?.current?.present();
                    }}
                  />
                }
                containerClassname={styles.btnsWrapper}
              />
            </div>
          </>
        )}
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "sing-up"),
              { name: "sing-up", ref: modalRef },
            ])
          }
        >
          <SingupForm modals={modals} />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "sing-in"),
              { name: "sing-in", ref: modalRef },
            ])
          }
        >
          <LoginForm modals={modals} />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "password-recovery"),
              { name: "password-recovery", ref: modalRef },
            ])
          }
        >
          <PasswordRecoveryForm />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "user-activation"),
              { name: "user-activation", ref: modalRef },
            ])
          }
        >
          <UserActivationForm modals={modals} />
        </SheetModalAuto>
      </IonContent>
    </IonPage>
  );
};

export default Home;
