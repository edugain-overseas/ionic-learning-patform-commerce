import React, { FC, useState } from "react";
import { IonIcon } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";
import { emailRegex } from "../../constants/regExps";
import User from "../../assets/icons/tabs/my-profile.svg";
import InputText from "./Inputs/InutText";
import InputPassword from "./Inputs/InputPassword";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import InputsWrapper from "./InputsWrapper";
import ServicesAuth from "./ServicesAuth";
import styles from "./Auth.module.scss";

type FormValues = {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

const FormHeader: FC<{ handleOpenLogin: () => void }> = ({
  handleOpenLogin,
}) => {
  const calledFromBasket = window.location.pathname.includes("basket");

  return (
    <div className={styles.formHeader}>
      <span className={styles.title}>
        {calledFromBasket ? "To continue your purchase," : "Sing up"}
      </span>
      <span className={styles.link}>
        {calledFromBasket
          ? "Please fill in the required details. If you already have an account, "
          : "If you already have an account, "}
        <span className={styles.modalReTrigger} onClick={handleOpenLogin}>
          sign in here!
        </span>
      </span>
    </div>
  );
};

const SingupForm: FC<{
  modals: {
    name: string;
    ref: React.RefObject<HTMLIonModalElement> | null;
  }[];
}> = ({ modals }) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useToast();

  const closeModal = () => {
    modals.find((modal) => modal.name === "sing-up")?.ref?.current?.dismiss();
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await user?.singup(data);
      user?.setUser((prev) => ({
        ...prev,
        username: data.username,
        email: data.email,
      }));

      present({
        type: 'guard',
        message: `Hello, ${data.username}, we cteated your account. Please activate your email: ${data.email}`,
        duration: 5000,
      });

      closeModal();

      modals
        .find((modal) => modal.name === "user-activation")
        ?.ref?.current?.present();
    } catch (error: any) {
      if (
        error.response.data.detail ===
        `User with username ${data.username} does exist`
      ) {
        setError("username", {
          type: "server response",
          message: error.response.data.detail,
        });
      } else if (
        error.response.data.detail ===
        `User with email ${data.email} does exist`
      ) {
        setError("email", {
          type: "server response",
          message: error.response.data.detail,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenLogin = () => {
    modals.find((modal) => modal.name === "sing-up")?.ref?.current?.dismiss();
    modals.find((modal) => modal.name === "sing-in")?.ref?.current?.present();
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <FormHeader handleOpenLogin={handleOpenLogin} />
      <InputsWrapper>
        <InputText
          name="username"
          placeholder="Username"
          height="32rem"
          registerProps={register("username", {
            required: "This field is required",
          })}
          error={errors.username?.message}
          status={isSubmitted && (errors.username?.message ? "error" : "valid")}
        />
        <InputText
          name="firstName"
          placeholder="First Name"
          height="32rem"
          registerProps={register("firstName")}
        />
        <InputText
          name="lastName"
          placeholder="Last Name"
          height="32rem"
          registerProps={register("lastName")}
        />
        <InputText
          name="email"
          type="email"
          placeholder="Email"
          height="32rem"
          registerProps={register("email", {
            required: "This field is required",
            pattern: {
              value: emailRegex,
              message: "Invaid Email. Example: example@mail.com",
            },
          })}
          error={errors.email?.message}
          status={isSubmitted && (errors.email?.message ? "error" : "valid")}
        />
        <InputPassword
          name="password"
          placeholder="Password"
          height="32rem"
          registerProps={register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Your password must contain at least 8 characters",
            },
          })}
          error={errors.password?.message}
          status={isSubmitted && (errors.password?.message ? "error" : "valid")}
        />
      </InputsWrapper>
      <div className={styles.btnsWrapper}>
        <CommonButton
          label="Sing up"
          icon={
            isLoading ? (
              <Spinner color="#fff" className={styles.formBtnIcon} />
            ) : (
              <IonIcon src={User} className={styles.formBtnIcon} />
            )
          }
          backgroundColor="#920000"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
          type="submit"
        />
        <div className={styles.btnsDivider}>
          <span>or continue with</span>
        </div>
        <ServicesAuth />
      </div>
    </form>
  );
};

export default SingupForm;
