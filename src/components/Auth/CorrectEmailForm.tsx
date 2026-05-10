import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import { emailRegex } from "../../constants/regExps";
import CommonButton from "../CommonButton/CommonButton";
import InputsWrapper from "./InputsWrapper";
import InputText from "./Inputs/InutText";
import styles from "./Auth.module.scss";

type FormValues = {
  email: string;
};

const CorrectEmailForm = ({
  modals,
}: {
  modals: {
    name: string;
    ref: React.RefObject<HTMLIonModalElement> | null;
  }[];
}) => {
  const user = useUser();
  const [present] = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      email: user?.user.email,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    try {
      modals
        .find((modal) => modal.name === "correct-email")
        ?.ref?.current?.dismiss();
      modals
        .find((modal) => modal.name === "user-activation")
        ?.ref?.current?.present();
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
        <span className={styles.title}>Correct Email</span>
        <span className={styles.link}>
          Please enter your correct email. We will send you a verification code.
        </span>
      </div>
      <InputsWrapper>
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
    </form>
  );
};

export default CorrectEmailForm;
