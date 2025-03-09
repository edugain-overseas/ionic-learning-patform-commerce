import {
  IonContent,
  IonIcon,
  IonModal,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { certificates } from "../../constants";
import { useUser } from "../../context/UserContext";
import DocumentDownloadIcon from "../../assets/icons/document-download.svg";
import Header from "../../components/Header/Header";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";
import CommonButton from "../../components/CommonButton/CommonButton";
import EditProfileData from "../../components/EditProfileData/EditProfileData";
import UserAvatarEditor from "../../components/UserAvatarEditor/UserAvatarEditor";
import UserMainInfo from "./UserMainInfo";
import UserProfileInfo from "./UserProfileInfo";
import UserStatistics from "./UserStatistics";
import UserCertificates from "./UserCertificates";
import styles from "./UserProfile.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// const pagination = {
//   clickable: true,
//   renderBullet: function (_: any, className: string) {
//     return `<span class="${className} ${styles.customBullet}"></span>`;
//   },
// };

const headerProps = {
  left: [{ name: "back" }],
  title: "My Profile",
  right: [
    { name: "notification", onClick: () => {} },
    { name: "settings", id: "open-edit-profile-modal", onClick: () => {} },
  ],
};

const UserProfile: React.FC = () => {
  const pageRef = useRef(null);
  const editUserDataModalRef = useRef<HTMLIonModalElement>(null);
  const editUserAvatarRef = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const userInterface = useUser();
  const userData = userInterface?.user;

  const closeEditUserDataModal = () => {
    if (editUserDataModalRef.current) {
      editUserDataModalRef.current.dismiss();
    }
  };

  const closeEditAvatarModal = () => {
    if (editUserAvatarRef.current) {
      editUserAvatarRef.current.dismiss();
    }
    if (editUserDataModalRef.current) {
      editUserDataModalRef.current.present();
    }
  };

  const openEditAvatarModal = () => {
    if (editUserDataModalRef.current) {
      editUserDataModalRef.current.dismiss();
    }
    if (editUserAvatarRef.current) {
      editUserAvatarRef.current.present();
    }
  };

  useEffect(() => {
    setPresentingElement(pageRef.current);
  }, []);

  // const handleUploadCertificate = async () => {
  //   const fileUrl = "https://pdfobject.com/pdf/sample.pdf";

  //   try {
  //     const response = await fetch(fileUrl);
  //     const blob = await response.blob();

  //     const fileName = "certificate.pdf";

  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.setAttribute("download", fileName);
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     // await Filesystem.writeFile({
  //     //   path: fileName,
  //     //   data: blob,
  //     //   directory: Directory.Documents, // Save in downloads directory
  //     //   encoding: Encoding.UTF8,
  //     // });

  //     console.log("File downloaded successfully:", fileName);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  return (
    <IonPage id="profile" ref={pageRef}>
      <Header {...headerProps} />
      <IonContent className={styles.pageWrapper}>
        <UserMainInfo userData={userData} />
        <UserProfileInfo userData={userData} />
        <UserStatistics userData={userData} />
        <UserCertificates />
        <IonModal
          ref={editUserDataModalRef}
          className={styles.editDataModal}
          trigger="open-edit-profile-modal"
          presentingElement={presentingElement!}
          mode="ios"
        >
          <EditProfileData
            closeModal={closeEditUserDataModal}
            openAvatarEditorModal={openEditAvatarModal}
          />
        </IonModal>
        <SheetModalAuto refModal={editUserAvatarRef} keyboardClose={false}>
          <UserAvatarEditor closeModal={closeEditAvatarModal} />
        </SheetModalAuto>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
