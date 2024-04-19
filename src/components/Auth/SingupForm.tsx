import React from "react";
import { IonIcon } from "@ionic/react";
import User from "../../assets/icons/tabs/my-profile.svg";
import Google from "../../assets/icons/auth/google.svg";
import InputText from "./Inputs/InutText";
import InputPassword from "./Inputs/InputPassword";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constants/regExps";

type FormValues = {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

const SingupForm: React.FC<{
  modals: {
    name: string;
    ref: React.RefObject<HTMLIonModalElement> | null;
  }[];
}> = ({ modals }) => {
  const user = useUser();

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
    console.log(data);
    // try {
    //   await user?.login(data);
    //   modals.find((modal) => modal.name === "sing-up")?.ref?.current?.dismiss();
    // } catch (error: any) {
    //   if (error.response.data.detail === "Invalid username") {
    //     setError("username", {
    //       type: "server response",
    //       message: error.response.data.detail,
    //     });
    //   } else if (error.response.data.detail === "Invalid password") {
    //     setError("password", {
    //       type: "server response",
    //       message: error.response.data.detail,
    //     });
    //   }
    // }
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className={styles.formHeader}>
        <span className={styles.title}>Sing up</span>
        <span className={styles.link}>
          If you don't have an account yet,{" "}
          <span className={styles.modalReTrigger}>sign up here!</span>
        </span>
      </div>
      <div className={styles.inputsWrapper}>
        <InputText
          name="username"
          placeholder="Username"
          height="32px"
          registerProps={register("username", {
            required: "This field is required",
          })}
          error={errors.username?.message}
          status={isSubmitted && (errors.username?.message ? "error" : "valid")}
        />
        <InputText
          name="firstName"
          placeholder="First Name"
          height="32px"
          registerProps={register("firstName")}
        />
        <InputText
          name="lastName"
          placeholder="Last Name"
          height="32px"
          registerProps={register("lastName")}
        />
        <InputText
          name="email"
          placeholder="Email"
          height="32px"
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
          height="32px"
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
      </div>
      <div className={styles.btnsWrapper}>
        <CommonButton
          label="Sing up"
          icon={<IonIcon src={User} className={styles.formBtnIcon} />}
          backgroundColor="#d00000"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
          type="submit"
        />
        <div className={styles.btnsDivider}>
          <span>or continue with</span>
        </div>
        <CommonButton
          onClick={() => {}}
          label="Account Google"
          icon={<IonIcon src={Google} className={styles.googleIcon} />}
          backgroundColor="transparent"
          color="#001C54"
          border="1px solid #7E8CA8"
          block={true}
          height={32}
          borderRadius={5}
          className={styles.googleBtn}
        />
      </div>
    </form>
  );
};

export default SingupForm;
