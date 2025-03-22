import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import InputText from "./Inputs/InutText";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";
import { useIonToast } from "@ionic/react";
import InputsWrapper from "./InputsWrapper";

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
  const [present] = useIonToast();

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
        message: `${user?.user.username}, you are succesfully avtivate you email`,
        duration: 5000,
        position: "top",
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
    }
  };

  const handleResendCode = () => {
    try {
      user?.resendActivationCode(user.user.username);
    } catch (error) {
      console.log(error);
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
        <span className={styles.title}>Email verification</span>
        <span className={styles.link}>
          Let us know that this email address belongs to you. Enter the code
          from the email sent to{" "}
          <span className={styles.modalReTrigger}>
            {user?.user.email ? user?.user.email : "your email"}
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
      <span className={styles.resend} onClick={handleResendCode}>
        Send the code <b className={styles.link}>again!</b>
      </span>
    </form>
  );
};

export default UserActivationForm;
