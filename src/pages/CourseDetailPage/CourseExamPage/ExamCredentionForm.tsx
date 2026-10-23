import { FieldValues, useForm } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useToast } from "../../../hooks/useToast";
import saveIcon from "../../../assets/icons/save.svg";
import InputText from "../../../components/Auth/Inputs/InutText";
import CommonButton from "../../../components/CommonButton/CommonButton";
import Spinner from "../../../components/Spinner/Spinner";
import styles from "./CourseExamPage.module.scss";

type ValuesType = {
  name: string;
  surname: string;
};

type FieldData = {
  fieldName: keyof ValuesType;
  disabled: boolean;
};

const ExamCredentionForm = ({
  onSubmitCallback,
  defaultValues,
  disabledFields,
}: {
  onSubmitCallback: () => Promise<void>;
  defaultValues: ValuesType;
  disabledFields: FieldData[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm({ defaultValues });
  const [present] = useToast();
  const updateUserInfo = useUser()?.updateUserInfo;

  const { isDirty, dirtyFields } = formState;

  const isFieldDisabled = (name: keyof ValuesType) => {
    return disabledFields.find((fieldData) => fieldData.fieldName === name)
      ?.disabled;
  };

  const handleNoChangesSubmit = async () => {
    try {
      setIsLoading(true);
      await onSubmitCallback();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    if (!isDirty) {
      await handleNoChangesSubmit();
      return;
    }

    const dataToUpdate = {} as ValuesType;
    (Object.keys(data) as (keyof ValuesType)[])
      .filter((key) => dirtyFields[key])
      .forEach((key) => (dataToUpdate[key] = data[key]));

    const hasChanges = Object.keys(dataToUpdate).length > 0;

    if (!hasChanges) {
      await handleNoChangesSubmit();
      return;
    }
    if (!updateUserInfo) {
      present({
        type: "error",
        message: "User is invalid!. Please login or reload the page",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateUserInfo(dataToUpdate);
      await onSubmitCallback();
    } catch (error) {
      present({
        type: "error",
        message: "Something went wrong! Please try again",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className={styles.leaveModalContentContainer}
    >
      <h4>Please note!</h4>
      <p className={styles.leaveModalMainInfo}>
        Please check the spelling of your <b>first and last name</b> before
        continuing, so that there are no errors in the documents that will be
        generated in the future. <br /> <b>If everything is correct</b>, just
        close the window.
      </p>
      <div className={styles.leaveModalInputs}>
        <InputText
          registerProps={register("name")}
          name="name"
          placeholder="First Name"
          disabled={isFieldDisabled("name")}
        />
        <InputText
          registerProps={register("surname")}
          name="surname"
          placeholder="Last Name"
          disabled={isFieldDisabled("surname")}
        />
        <CommonButton
          type="submit"
          label="Save and continue"
          icon={
            isLoading ? <Spinner color="#fcfcfc" /> : <IonIcon src={saveIcon} />
          }
          color="#fcfcfc"
          backgroundColor="#37384B"
          height={32}
          block={true}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default ExamCredentionForm;
