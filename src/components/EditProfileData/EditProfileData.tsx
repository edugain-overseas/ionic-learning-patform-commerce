import React, { useState } from "react";
import { IonContent, IonIcon } from "@ionic/react";
import avatar from "../../assets/images/subject_image.png";
import EditIcon from "../../assets/icons/edit-bottom-line.svg";
import ReLoadIcon from "../../assets/icons/re-load.svg";
import SaveIcon from "../../assets/icons/save.svg";
import Header from "../Header/Header";
import Avatar from "../Avatar/Avatar";
import CommonButton from "../CommonButton/CommonButton";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./EditProfileData.module.scss";

const EditProfileData: React.FC = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const headerProps = {
    left: [{ name: "back" }],
    title: "Edite profile data",
    right: [{ name: "save", onClick: () => {} }],
    mode: "transparent",
    toolbarClassName: styles.headerToolbar,
  };

  return (
    <>
      <IonContent className={styles.wrapper} fullscreen={true}>
        <Header {...headerProps} />
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
          />
        </div>
        <div className={styles.formWrapper}>
          <InputWithLabel
            value={username}
            onChange={setUsername}
            name="Username"
          />
          <InputWithLabel
            value={firstname}
            onChange={setFirstname}
            name="First name"
          />
          <InputWithLabel
            value={lastname}
            onChange={setLastname}
            name="Last name"
          />
          <InputWithLabel value={email} onChange={setEmail} name="Email" />
          <InputWithLabel
            value={password}
            onChange={setPassword}
            name="Password"
          />
          <InputWithLabel value={phone} onChange={setPhone} name="Phone" />
          <InputWithLabel
            value={country}
            onChange={setCountry}
            name="Country"
          />
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
            label="Save"
            icon={<IonIcon src={SaveIcon} />}
            width={102}
            height={32}
            backgroundColor="transparent"
            borderRadius={5}
            border="1px solid #7E8CA8"
          />
        </div>
      </IonContent>
    </>
  );
};

export default EditProfileData;
