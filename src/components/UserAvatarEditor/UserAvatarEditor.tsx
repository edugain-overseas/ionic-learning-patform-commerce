import { FC, useEffect, useState } from "react";
import styles from "./UserAvatarEditor.module.scss";
import CommonButton from "../CommonButton/CommonButton";
import { IonIcon, IonSpinner } from "@ionic/react";
import SaveIcon from "../../assets/icons/save.svg";
import { useUser } from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import cameraIcon from "../../assets/icons/camera.svg";
import galleryIcon from "../../assets/icons/gallery.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";

interface UserAvatarEditorPropsType {
  closeModal?: () => void;
}

const UserAvatarEditor: FC<UserAvatarEditorPropsType> = ({ closeModal }) => {
  const userInterface = useUser();
  const [image, setImage] = useState<Photo>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userInterface?.getLastUserImages();
  }, []);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    setImage(image);
  };

  const pickPhoto = async () => {
    const image = await Camera.pickImages({
      quality: 90,
      limit: 1,
    });
    console.log(image);
  };

  console.log(image);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Select your profile photo</span>
      </div>
      {image ? (
        <div className={styles.avatarEditor}>
          <img
            src={`data:image/${image.format};base64, ` + image.base64String}
          />
        </div>
      ) : (
        <>
          <div className={styles.userAvatars}>
            {userInterface?.user.previousAvatars.length === 0 ? (
              <Avatar size={46} />
            ) : (
              userInterface?.user.previousAvatars.map((avatar) => (
                <Avatar src={avatar} size={46} key={avatar} />
              ))
            )}
          </div>
          <ul className={styles.imageSourceList}>
            <li className={styles.sourceItem} onClick={takePhoto}>
              <InsetBtn
                width="32px"
                height="32px"
                icon={<IonIcon src={cameraIcon} />}
              />
              <span className={styles.sourceSpan}>To make a photo</span>
            </li>
            <li className={styles.sourceItem} onClick={pickPhoto}>
              <InsetBtn
                width="32px"
                height="32px"
                icon={<IonIcon src={galleryIcon} />}
              />
              <span className={styles.sourceSpan}>Choose from gallery</span>
            </li>
          </ul>
        </>
      )}
      <div className={styles.footer}>
        <CommonButton
          width={102}
          height={32}
          label="Cancel"
          onClick={closeModal}
          className={styles.button}
          backgroundColor="transparent"
          borderRadius={5}
          border="1px solid #7E8CA8"
        />
        <CommonButton
          label="Save"
          icon={
            isLoading ? (
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
          disabled={isLoading}
          className={styles.button}
        />
      </div>
    </div>
  );
};

export default UserAvatarEditor;
