import { FC, useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraDirection,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { useUser } from "../../context/UserContext";
import { base64ToFile } from "../../utils/base64ToFile";
import { IonIcon, IonSpinner } from "@ionic/react";
import CommonButton from "../CommonButton/CommonButton";
import SaveIcon from "../../assets/icons/save.svg";
import Avatar from "../Avatar/Avatar";
import cameraIcon from "../../assets/icons/camera.svg";
import galleryIcon from "../../assets/icons/gallery.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import AvatarEditorComponent from "./AvatarEditorComponent";
import AvatarEditor from "react-avatar-editor";
import styles from "./UserAvatarEditor.module.scss";

interface UserAvatarEditorPropsType {
  closeModal?: () => void;
}

const UserAvatarEditor: FC<UserAvatarEditorPropsType> = ({ closeModal }) => {
  const userInterface = useUser();
  const [image, setImage] = useState<Photo>();
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<AvatarEditor>(null);

  useEffect(() => {
    userInterface?.getLastUserImages();
  }, []);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
    });
    setImage(image);
  };

  const pickPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    setImage(image);
  };

  const handleSaveNewAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const userId = userInterface?.user.userId;
        if (userId && blob) {
          const formData = new FormData();
          formData.append("image", blob, `user${userId}-avatar-${Date.now()}`);
          try {
            userInterface.updateUserImage(formData);
            closeModal && closeModal();
          } catch (error) {
            console.log(error);
          }
        }
      }, "image/png");
    }
  };

  const handleSetAvatar = (imageId: number) => {
    try {
      userInterface?.setMainImage(imageId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Select your profile photo</span>
      </div>
      {image?.base64String ? (
        <AvatarEditorComponent
          image={base64ToFile(
            image.base64String,
            "name",
            `image/${image.format}`
          )}
          editorRef={editorRef}
        />
      ) : (
        <>
          <ul className={styles.userAvatars}>
            {userInterface?.user.previousAvatars.length === 0 ? (
              <li>
                <Avatar size={46} />
              </li>
            ) : (
              userInterface?.user.previousAvatars.map((avatar) => (
                <li
                  key={avatar.id}
                  onClick={() => !avatar.is_main && handleSetAvatar(avatar.id)}
                  className={avatar.is_main ? styles.selectedItem : ""}
                >
                  <Avatar src={avatar.path} size={46} editable={false} />
                </li>
              ))
            )}
          </ul>
          <ul className={styles.imageSourceList}>
            <li className={styles.sourceItem} onClick={takePhoto}>
              <InsetBtn
                width="32rem"
                height="32rem"
                icon={<IonIcon src={cameraIcon} />}
              />
              <span className={styles.sourceSpan}>To make a photo</span>
            </li>
            <li className={styles.sourceItem} onClick={pickPhoto}>
              <InsetBtn
                width="32rem"
                height="32rem"
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
          border="1rem solid #7E8CA8"
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
          border="1rem solid #7E8CA8"
          type="submit"
          disabled={isLoading}
          className={styles.button}
          onClick={handleSaveNewAvatar}
        />
      </div>
    </div>
  );
};

export default UserAvatarEditor;
