import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import InputText from "./Inputs/InutText";
import CommonButton from "../CommonButton/CommonButton";
import InputsWrapper from "./InputsWrapper";
import styles from "./Auth.module.scss";

type FormValues = {
  verificationCode: string;
};

const UserActivationForm: React.FC<{
  modals: {
    name: string;
    ref: React.RefObject<HTMLIonModalElement> | null;
  }[];
}> = ({ modals }) => {
  const user = useUser();
  const [present] = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      await user?.verifyEmail({
        username: user.user.username,
        code: data.verificationCode,
      });

      present({
        type: "success",
        message: `${user?.user.username}, you are succesfully activated you email`,
      });

      modals
        .find((modal) => modal.name === "user-activation")
        ?.ref?.current?.dismiss();
    } catch (error: any) {
      if (error.response.data.detail === "email not found") {
        setError("verificationCode", {
          type: "server response",
          message: error.response.data.detail,
        });
      }
      if (error.response.data.detail === "Invalid activate code") {
        setError("verificationCode", {
          type: "server reponse",
          message: error.response.data.detail,
        });
        present({ type: "error", message: error.response.data.detail });
      }
    }
  };

  const handleResendCode = () => {
    try {
      user?.resendActivationCode(user.user.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenCorrectEmail = () => {
    modals
      .find((modal) => modal.name === "user-activation")
      ?.ref?.current?.dismiss();

    modals
      .find((modal) => modal.name === "correct-email")
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
        <span className={styles.title}>Email verification</span>
        <span className={styles.link}>
          Let us know that this email address belongs to you. Enter the code
          from the email sent to{" "}
          <span className={styles.modalReTrigger}>
            {user?.user.email || user?.user.username
              ? user?.user.email || user?.user.username
              : "your email"}
          </span>
        </span>
      </div>
      <InputsWrapper>
        <InputText
          name="verificationCode"
          placeholder="Verification code"
          registerProps={register("verificationCode", {
            required: "This field is required",
          })}
          height="32rem"
          error={errors.verificationCode?.message}
          status={
            isSubmitted &&
            (errors.verificationCode?.message ? "error" : "valid")
          }
        />
      </InputsWrapper>

      <div className={styles.btnsWrapper}>
        <CommonButton
          label="Continue"
          backgroundColor="#001C54"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
          type="submit"
        />
      </div>
      <div className={styles.formAdditionalBtnsWrapper}>
        <span className={styles.resend} onClick={handleOpenCorrectEmail}>
          Correct <b className={styles.link}>email</b>
        </span>
        <span className={styles.resend} onClick={handleResendCode}>
          Send the code <b className={styles.link}>again!</b>
        </span>
      </div>
    </form>
  );
};

export default UserActivationForm;
