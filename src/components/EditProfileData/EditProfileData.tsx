import { FC, useState } from "react";
import { IonContent, IonIcon, IonSpinner, IonToast } from "@ionic/react";
import { UserInfoToUpdateType, useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { getCountries } from "../../utils/countries";
import { emailRegex } from "../../constants/regExps";
import avatar from "../../assets/images/subject_image.png";
import EditIcon from "../../assets/icons/edit-bottom-line.svg";
import ReLoadIcon from "../../assets/icons/re-load.svg";
import SaveIcon from "../../assets/icons/save.svg";
import Header from "../Header/Header";
import Avatar from "../Avatar/Avatar";
import CommonButton from "../CommonButton/CommonButton";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Select from "../Select/Select";
import styles from "./EditProfileData.module.scss";

type EditUserDataForm = {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
};

const countries = getCountries();

const countryOptions = countries.map((country) => ({
  label: country.name,
  value: country.code || country.name,
}));

const EditProfileData: FC<{
  closeModal?: () => void;
  openAvatarEditorModal?: () => void;
}> = ({ closeModal, openAvatarEditorModal }) => {
  const userInterface = useUser();
  const userData = userInterface?.user;

  const [country, setCountry] = useState<string>(
    userData?.country ? userData.country : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserDataForm>({
    defaultValues: {
      username: userData?.username,
      firstname: userData?.name,
      lastname: userData?.surname,
      email: userData?.email,
      password: "",
      phone: userData?.phone,
    },
  });

  const onSubmit = async (data: EditUserDataForm) => {
    const dataToUpdate: UserInfoToUpdateType = {};
    if (userData?.name !== data.firstname) {
      dataToUpdate.name = data.firstname;
    }
    if (userData?.surname !== data.lastname) {
      dataToUpdate.surname = data.lastname;
    }
    if (userData?.email !== data.email) {
      dataToUpdate.email = data.email;
    }
    if (data.password !== "") {
      dataToUpdate.password = data.password;
    }
    if (userData?.country !== country && country !== "") {
      dataToUpdate.country = country;
    }
    if (userData?.phone !== data.phone) {
      dataToUpdate.phone = data.phone;
    }
    try {
      if (userData?.username !== data.username && data.username) {
        await userInterface?.updateUsername(data.username);
      }
      if (Object.keys(dataToUpdate).length !== 0) {
        await userInterface?.updateUserInfo(dataToUpdate);
      }
      closeModal && closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const headerProps = {
    left: [{ name: "prevLesson", onClick: closeModal }],
    title: "Edite profile data",
    right: [{ name: "save", onClick: () => {} }],
    mode: "transparent",
    toolbarClassName: styles.headerToolbar,
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent className={styles.wrapper} fullscreen={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.avatarWrapper}>
            <Avatar size={96} src={avatar} editable={false} />
            <CommonButton
              width={152}
              height={32}
              backgroundColor="transparent"
              borderRadius={5}
              border="1px solid #7E8CA8"
              label="Change avatar"
              icon={<IonIcon src={EditIcon} className={styles.editIcon} />}
              type="button"
              onClick={openAvatarEditorModal}
            />
          </div>
          <div className={styles.formWrapper}>
            <InputWithLabel
              label="Username"
              registerProps={register("username")}
            />
            <InputWithLabel
              disabled={userData?.changedName}
              id="firstname"
              label="First name"
              registerProps={register("firstname")}
            />
            <IonToast
              message="You can change your first name just once!"
              trigger="firstname"
              duration={3000}
              position="top"
            />
            <InputWithLabel
              disabled={userData?.changedSurname}
              id="lastname"
              label="Last name"
              registerProps={register("lastname")}
            />
            <IonToast
              message="You can change your last name just once!"
              trigger="lastname"
              duration={3000}
              position="top"
            />

            <InputWithLabel
              label="Email"
              registerProps={register("email", {
                pattern: {
                  value: emailRegex,
                  message: "Invaid Email. Example: example@mail.com",
                },
              })}
              errorMessage={errors.email?.message}
            />
            <InputWithLabel
              label="Password"
              registerProps={register("password", {
                minLength: {
                  value: 8,
                  message: "Your password must contain at least 8 characters",
                },
              })}
              placeholder="********"
              type="password"
              errorMessage={errors.password?.message}
            />
            <InputWithLabel
              label="Phone number"
              registerProps={register("phone")}
              type="number"
            />
            <div className={styles.selectWrapper}>
              <span>Country:</span>
              <Select
                options={countryOptions}
                placeholder="Select your country"
                wrapperStyles={{
                  width: "100%",
                  height: "32px",
                  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.16) inset",
                }}
                dropDownWrapperStyles={{
                  top: "initial",
                  bottom: "calc(100% + 2px)",
                  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.16)",
                }}
                value={country}
                onChange={setCountry}
              />
            </div>
          </div>
          <div className={styles.formBtns}>
            <CommonButton
              label="Cancel"
              icon={<IonIcon src={ReLoadIcon} />}
              width={102}
              height={32}
              backgroundColor="transparent"
              borderRadius={5}
              border="1px solid #7E8CA8"
            />
            <CommonButton
              label={isSubmitting ? "Saving" : "Save"}
              icon={
                isSubmitting ? (
                  <IonSpinner color="light" />
                ) : (
                  <IonIcon src={SaveIcon} />
                )
              }
              width={102}
              height={32}
              backgroundColor="transparent"
              borderRadius={5}
              border="1px solid #7E8CA8"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </IonContent>
    </>
  );
};

export default EditProfileData;
