import { FC, useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import userIcon from "../../assets/icons/tabs/my-profile.svg";
import singInIcon from "../../assets/icons/auth/sing-in.svg";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";
import SheetModalAuto from "../SheetModalAuto/SheetModalAuto";
import SingupForm from "./SingupForm";
import LoginForm from "./LoginForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import UserActivationForm from "./UserActivationForm";
import { useUser } from "../../context/UserContext";

type AuthPropsType = {
  containerClassname?: string;
};

const Auth: FC<AuthPropsType> = ({ containerClassname = "" }) => {
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

  useEffect(() => {
    if (accessToken) {
      modals.forEach((modal) => modal.ref?.current?.dismiss());
    }
  }, [accessToken]);
  return (
    <>
      {!accessToken && (
        <div className={containerClassname}>
          <EqualSpaceContainer
            leftItem={
              <CommonButton
                width={138}
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
                width={138}
                height={32}
                borderRadius={5}
                color="#fcfcfc"
                backgroundColor="#001C54"
                label="Sing in"
                icon={<IonIcon src={singInIcon} className={styles.btnIcon} />}
                onClick={() => {
                  modals
                    .find((modal) => modal.name === "sing-in")
                    ?.ref?.current?.present();
                }}
              />
            }
            containerClassname={styles.authButtonsWrapper}
          />
        </div>
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
    </>
  );
};

export default Auth;
