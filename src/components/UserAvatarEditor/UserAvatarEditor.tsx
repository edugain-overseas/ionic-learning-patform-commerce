// import { FC, useEffect, useRef, useState } from "react";
// import {
//   Camera,
//   CameraDirection,
//   CameraResultType,
//   CameraSource,
//   Photo,
// } from "@capacitor/camera";
// import { Capacitor } from "@capacitor/core";
// import { useUser } from "../../context/UserContext";
// import { base64ToFile } from "../../utils/base64ToFile";
// import { IonIcon, IonSpinner } from "@ionic/react";
// import CommonButton from "../CommonButton/CommonButton";
// import SaveIcon from "../../assets/icons/save.svg";
// import Avatar from "../Avatar/Avatar";
// import cameraIcon from "../../assets/icons/camera.svg";
// import galleryIcon from "../../assets/icons/gallery.svg";
// import InsetBtn from "../InsetBtn/InsetBtn";
// import AvatarEditorComponent from "./AvatarEditorComponent";
// import AvatarEditor from "react-avatar-editor";
// import styles from "./UserAvatarEditor.module.scss";

// interface UserAvatarEditorPropsType {
//   closeModal?: () => void;
// }

// const UserAvatarEditor: FC<UserAvatarEditorPropsType> = ({ closeModal }) => {
//   const userInterface = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [image, setImage] = useState<File | string | null>(null);
//   const [scale, setScale] = useState(1);
//   const editorRef = useRef<AvatarEditor>(null);
//   const platform = Capacitor.getPlatform();

//   useEffect(() => {
//     userInterface?.getLastUserImages();
//   }, []);

//   const takePhoto = async () => {
//     try {
//       const photo = await Camera.takePhoto({
//         cameraDirection: CameraDirection.Front,
//         quality: 90,
//       });

//       if (photo.webPath) {
//         const safeUrl = Capacitor.convertFileSrc(photo.webPath);
//         const res = await fetch(safeUrl);
//         const blob = await res.blob();
//         const file = new File([blob], "camera-avatar.png", { type: blob.type });
//         setImage(file);
//         return;
//       }

//     } catch (error) {
//       console.log("User cancelled taking photo", error);
//     }
//   };

//   const pickPhoto = async () => {
//     try {
//       const image = await Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.Base64,
//         source: CameraSource.Photos,
//       });
//       setImage(image);
//     } catch (error) {
//       console.log("User cancelled picking photo", error);
//     }
//   };

//   const handleSaveNewAvatar = () => {
//     if (editorRef.current) {
//       const canvas = editorRef.current.getImageScaledToCanvas();
//       canvas.toBlob((blob) => {
//         const userId = userInterface?.user.userId;
//         if (userId && blob) {
//           const formData = new FormData();
//           formData.append("image", blob, `user${userId}-avatar-${Date.now()}`);
//           try {
//             userInterface.updateUserImage(formData);
//             closeModal && closeModal();
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       }, "image/png");
//     }
//   };

//   const handleSetAvatar = (imageId: number) => {
//     try {
//       userInterface?.setMainImage(imageId);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <span className={styles.title}>Select your profile photo</span>
//       </div>
//       {image?.base64String ? (
//         <AvatarEditorComponent
//           image={base64ToFile(
//             image.base64String,
//             "name",
//             `image/${image.format}`,
//           )}
//           editorRef={editorRef}
//           scale={scale}
//           setScale={setScale}
//         />
//       ) : (
//         <>
//           <ul className={styles.userAvatars}>
//             {userInterface?.user.previousAvatars.length === 0 ? (
//               <li>
//                 <Avatar size={46} editable={!Capacitor.isNativePlatform()} />
//               </li>
//             ) : (
//               userInterface?.user.previousAvatars.map((avatar) => (
//                 <li
//                   key={avatar.id}
//                   onClick={() => !avatar.is_main && handleSetAvatar(avatar.id)}
//                   className={avatar.is_main ? styles.selectedItem : ""}
//                 >
//                   <Avatar src={avatar.path} size={46} editable={false} />
//                 </li>
//               ))
//             )}
//           </ul>
//           <ul className={styles.imageSourceList}>
//             <li className={styles.sourceItem} onClick={takePhoto}>
//               <InsetBtn
//                 width="32rem"
//                 height="32rem"
//                 icon={<IonIcon src={cameraIcon} />}
//               />
//               <span className={styles.sourceSpan}>To make a photo</span>
//             </li>
//             <li className={styles.sourceItem} onClick={pickPhoto}>
//               <InsetBtn
//                 width="32rem"
//                 height="32rem"
//                 icon={<IonIcon src={galleryIcon} />}
//               />
//               <span className={styles.sourceSpan}>Choose from gallery</span>
//             </li>
//           </ul>
//         </>
//       )}
//       <div className={styles.footer}>
//         <CommonButton
//           width={102}
//           height={32}
//           label="Cancel"
//           onClick={closeModal}
//           className={styles.button}
//           backgroundColor="transparent"
//           borderRadius={5}
//           border="1rem solid #5D6977"
//         />
//         <CommonButton
//           label="Save"
//           icon={
//             isLoading ? (
//               <IonSpinner color="light" />
//             ) : (
//               <IonIcon src={SaveIcon} />
//             )
//           }
//           width={102}
//           height={32}
//           backgroundColor="transparent"
//           borderRadius={5}
//           border="1rem solid #5D6977"
//           type="submit"
//           disabled={isLoading}
//           className={styles.button}
//           onClick={handleSaveNewAvatar}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserAvatarEditor;

import { FC, useEffect, useRef, useState } from "react";
import { Camera, CameraDirection, MediaTypeSelection } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { useUser } from "../../context/UserContext";
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
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  const [fileToEdit, setFileToEdit] = useState<File | string | null>(null);

  useEffect(() => {
    userInterface?.getLastUserImages();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await Camera.takePhoto({
        cameraDirection: CameraDirection.Front,
        quality: 90,
      });

      if (photo.webPath) {
        const res = await fetch(photo.webPath);
        const blob = await res.blob();
        const file = new File([blob], "camera-avatar.png", { type: blob.type });
        setFileToEdit(file);
      }
    } catch (error) {
      console.log("User cancelled taking photo", error);
    }
  };

  const pickPhoto = async () => {
    try {
      const { results } = await Camera.chooseFromGallery({
        mediaType: MediaTypeSelection.Photo,
        limit: 1,
        quality: 90,
      });

      const selectedPhoto = results && results.length > 0 ? results[0] : null;

      if (selectedPhoto && selectedPhoto.webPath) {
        const safeUrl = Capacitor.convertFileSrc(selectedPhoto.webPath);

        const res = await fetch(safeUrl);
        const blob = await res.blob();
        const file = new File([blob], "gallery-avatar.png", {
          type: blob.type,
        });
        setFileToEdit(file);
      }
    } catch (error) {
      console.log("User cancelled picking photo", error);
    }
  };

  const handleSaveNewAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();

      canvas.toBlob(async (blob) => {
        const userId = userInterface?.user.userId;
        if (userId && blob) {
          setIsLoading(true);
          const formData = new FormData();
          formData.append(
            "image",
            blob,
            `user${userId}-avatar-${Date.now()}.png`,
          );

          try {
            await userInterface.updateUserImage(formData);
            closeModal && closeModal();
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }
      }, "image/png");
    }
  };

  const handleSetAvatar = async (imageId: number) => {
    try {
      setIsLoading(true);
      await userInterface?.setMainImage(imageId);
      closeModal && closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Select your profile photo</span>
      </div>
      {fileToEdit ? (
        <AvatarEditorComponent
          image={fileToEdit}
          editorRef={editorRef}
          scale={scale}
          setScale={setScale}
        />
      ) : (
        <>
          <ul className={styles.userAvatars}>
            {userInterface?.user.previousAvatars.length === 0 ? (
              <li>
                <Avatar size={46} editable={!Capacitor.isNativePlatform()} />
              </li>
            ) : (
              userInterface?.user.previousAvatars.map((avatar) => (
                <li
                  key={avatar.id}
                  onClick={() =>
                    !avatar.is_main && !isLoading && handleSetAvatar(avatar.id)
                  }
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
          border="1rem solid #5D6977"
          disabled={isLoading}
        />
        <CommonButton
          label={isLoading ? "" : "Save"}
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
          border="1rem solid #5D6977"
          disabled={isLoading || !fileToEdit}
          className={styles.button}
          onClick={handleSaveNewAvatar}
        />
      </div>
    </div>
  );
};

export default UserAvatarEditor;
