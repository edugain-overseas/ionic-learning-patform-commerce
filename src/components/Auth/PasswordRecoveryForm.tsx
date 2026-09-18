import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import InputText from "./Inputs/InutText";
import CommonButton from "../CommonButton/CommonButton";
import InputsWrapper from "./InputsWrapper";
import styles from "./Auth.module.scss";

type FormValues = {
  email: string;
};

const PasswordRecoveryForm: React.FC<{
  modals: { name: string; ref: React.RefObject<HTMLIonModalElement> | null }[];
  setTempEmail: (email: string) => void;
}> = ({ modals, setTempEmail }) => {
  const user = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      email: user?.user?.email || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      await user?.resetPassword(data.email);
      setTempEmail(data.email);
      modals
        .find((modal) => modal.name === "password-recovery")
        ?.ref?.current?.dismiss();
      modals
        .find((modal) => modal.name === "new-password")
        ?.ref?.current?.present();
    } catch (error: any) {
      if (error.response.data.detail === "email not found") {
        setError("email", {
          type: "server response",
          message: error.response.data.detail,
        });
      }
    }
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className={styles.formHeader}>
        <span className={styles.title}>Password recovery</span>
        <span className={styles.link}>
          Enter the email that was used for registration. We will send you a
          recovery code.
        </span>
      </div>
      <InputsWrapper>
        <InputText
          name="email"
          placeholder="Email"
          registerProps={register("email", {
            required: "This field is required",
          })}
          height="32rem"
          error={errors.email?.message}
          status={isSubmitted && (errors.email?.message ? "error" : "valid")}
        />
      </InputsWrapper>
      <div className={styles.btnsWrapper}>
        <CommonButton
          label="Continue"
          backgroundColor="#37384B"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
          type="submit"
        />
      </div>
    </form>
  );
};

export default PasswordRecoveryForm;
