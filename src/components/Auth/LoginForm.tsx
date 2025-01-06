import React, { useState } from "react";
import { IonIcon, useIonToast } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import SingIn from "../../assets/icons/auth/sing-in.svg";
import InputText from "./Inputs/InutText";
import InputPassword from "./Inputs/InputPassword";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Auth.module.scss";
import GoogleAuthButton from "./GoogleAuthButton";

type FormValues = {
  username: string;
  password: string;
};

const LoginForm: React.FC<{
  modals: {
    name: string;
    ref: React.RefObject<HTMLIonModalElement> | null;
  }[];
}> = ({ modals }) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await user?.login(data);
      present({
        message: `Welcome, ${data.username}!`,
        duration: 2000,
        position: "top",
      });
      modals.find((modal) => modal.name === "sing-in")?.ref?.current?.dismiss();
    } catch (error: any) {
      console.log(error);

      if (error.response?.data?.detail === "Invalid username") {
        setError("username", {
          type: "server response",
          message: error.response.data.detail,
        });
      } else if (error.response?.data?.detail === "Invalid password") {
        setError("password", {
          type: "server response",
          message: error.response.data.detail,
        });
      } else if (error.response.status === 409) {
        user?.setUser((prev) => ({ ...prev, username: data.username }));
        present({
          message: `Welcome back, ${data.username}. Please activate your email`,
          duration: 5000,
          position: "top",
        });
        handleOpenUserActivation();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSingUp = () => {
    modals.find((modal) => modal.name === "sing-in")?.ref?.current?.dismiss();
    modals.find((modal) => modal.name === "sing-up")?.ref?.current?.present();
  };

  const handleOpenUserActivation = () => {
    modals.find((modal) => modal.name === "sing-in")?.ref?.current?.dismiss();
    modals
      .find((modal) => modal.name === "user-activation")
      ?.ref?.current?.present();
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className={styles.formHeader}>
        <span className={styles.title}>Sing in</span>
        <span className={styles.link}>
          If you don't have an account yet,{" "}
          <span className={styles.modalReTrigger} onClick={handleOpenSingUp}>
            sign up here!
          </span>
        </span>
      </div>
      <div className={styles.inputsWrapper}>
        <InputText
          name="username"
          placeholder="Username"
          registerProps={register("username", {
            required: "This field is required",
          })}
          height="32rem"
          error={errors.username?.message}
          status={isSubmitted && (errors.username?.message ? "error" : "valid")}
        />

        <InputPassword
          name="password"
          placeholder="Password"
          registerProps={register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Your password must contain at least 8 characters",
            },
          })}
          error={errors.password?.message}
          status={isSubmitted && (errors.password?.message ? "error" : "valid")}
          height="32rem"
        />
      </div>
      <div className={styles.btnsWrapper}>
        <CommonButton
          label="Sing in"
          icon={
            isLoading ? (
              <Spinner color="#fff" className={styles.formBtnIcon} />
            ) : (
              <IonIcon src={SingIn} className={styles.formBtnIcon} />
            )
          }
          backgroundColor="#001C54"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
          type="submit"
          disabled={isLoading}
        />
        <div
          className={`${styles.passwordRecoveryBtnWrapper} ${
            errors.password?.type === "server response" ? styles.show : ""
          }`}
        >
          <CommonButton
            label="Forgot your password?"
            backgroundColor="#ECECEC"
            color="#7E8CA8"
            block={true}
            height={32}
            borderRadius={5}
            id="password-recovery"
            onClick={() => {
              modals.forEach((modal) => {
                modal.name === "sing-in" && modal.ref?.current?.dismiss();
                modal.name === "password-recovery" &&
                  modal.ref?.current?.present();
              });
            }}
          />
        </div>
        <div className={styles.btnsDivider}>
          <span>or continue with</span>
        </div>
        <GoogleAuthButton />
      </div>
    </form>
  );
};

export default LoginForm;
