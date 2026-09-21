import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import InputText from "./Inputs/InutText";
import CommonButton from "../CommonButton/CommonButton";
import InputsWrapper from "./InputsWrapper";
import styles from "./Auth.module.scss";
import InputPassword from "./Inputs/InputPassword";
import { useToast } from "../../hooks/useToast";

type FormValues = {
  recoveryCode: string;
  newPassword: string;
};

const NewPasswordForm: React.FC<{
  modals: { name: string; ref: React.RefObject<HTMLIonModalElement> | null }[];
  tempEmail: string;
}> = ({ modals, tempEmail }) => {
  const user = useUser();
  const [messageApi] = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      recoveryCode: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      await user?.setNewPassword({
        email: tempEmail,
        code: data.recoveryCode,
        new_pass: data.newPassword,
      });
      await user?.login({
        username: tempEmail,
        password: data.newPassword,
      });

      messageApi({
        type: "success",
        message: "Your password has been successfully changed.",
      });

      modals
        .find((modal) => modal.name === "new-password")
        ?.ref?.current?.dismiss();
    } catch (error: any) {
      messageApi({
        type: "error",
        message:
          error.response?.data?.detail ||
          "An error occurred. Please try again.",
      });

      if (error.response?.data?.detail === "Invalid reset code") {
        setError("recoveryCode", {
          type: "server response",
          message: error.response?.data?.detail,
        });
      }
    }
  };

  const handleResendCode = async () => {
    try {
      await user?.resendResetCode(tempEmail || "");
      messageApi({
        type: "success",
        message: `We send you a new code to your email: ${tempEmail}`,
      });
    } catch (error) {
      console.log(error);
      messageApi({
        type: "error",
        message: "Failed to send a new code. Please try again later.",
      });
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
          Enter the recieved code to your email and enter a new password.
        </span>
      </div>
      <InputsWrapper>
        <InputText
          name="recoveryCode"
          placeholder="Recovery code"
          registerProps={register("recoveryCode", {
            required: "This field is required",
            minLength: { value: 6, message: "Code must be 6 characters long" },
            maxLength: { value: 6, message: "Code must be 6 characters long" },
          })}
          height="32rem"
          error={errors.recoveryCode?.message}
          status={
            isSubmitted && (errors.recoveryCode?.message ? "error" : "valid")
          }
        />
        <InputPassword
          name="newPassword"
          placeholder="New password"
          registerProps={register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Your password must contain at least 8 characters",
            },
          })}
          error={errors.newPassword?.message}
          status={
            isSubmitted && (errors.newPassword?.message ? "error" : "valid")
          }
          height="32rem"
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
      <div className={styles.formAdditionalBtnsWrapper}>
        <span className={styles.resend} onClick={handleResendCode}>
          Send the code <b className={styles.link}>again!</b>
        </span>
      </div>
    </form>
  );
};

export default NewPasswordForm;
