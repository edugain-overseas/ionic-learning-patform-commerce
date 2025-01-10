import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { useAuthUi } from "../../context/AuthUIContext";
import userIcon from "../../assets/icons/tabs/my-profile.svg";
import singInIcon from "../../assets/icons/auth/sing-in.svg";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";

type AuthPropsType = {
  containerClassname?: string;
};

const Auth: FC<AuthPropsType> = ({ containerClassname = "" }) => {
  const accessToken = useUser()?.user.accessToken;

  const authUiInterface = useAuthUi();

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
                onClick={() => authUiInterface?.openAuthUI("sing-up")}
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
                onClick={() => authUiInterface?.openAuthUI("sing-in")}
              />
            }
            containerClassname={styles.authButtonsWrapper}
          />
        </div>
      )}
    </>
  );
};

export default Auth;
