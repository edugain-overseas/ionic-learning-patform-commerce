import { IonContent, IonModal, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";
import EditProfileData from "../../components/EditProfileData/EditProfileData";
import UserAvatarEditor from "../../components/UserAvatarEditor/UserAvatarEditor";
import UserMainInfo from "./UserMainInfo";
import UserProfileInfo from "./UserProfileInfo";
import UserStatistics from "./UserStatistics";
import UserCertificates from "./UserCertificates";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import styles from "./UserProfile.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useToast } from "../../hooks/useToast";

const UserProfile: React.FC = () => {
  const pageRef = useRef(null);
  const editUserDataModalRef = useRef<HTMLIonModalElement>(null);
  const editUserAvatarRef = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const userInterface = useUser();
  const userData = userInterface?.user;
  const isUserLoggedIn = userData?.accessToken !== null;
  const [api] = useToast();

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

  const openAvatarEditorModal = () => {
    if (!isUserLoggedIn) {
      api({
        type: "guard",
        message: "Available to registered users, please login.",
      });
      return;
    }
    if (editUserDataModalRef.current) {
      editUserDataModalRef.current.dismiss();
    }
    if (editUserAvatarRef.current) {
      editUserAvatarRef.current.present();
    }
  };

  const onRefresh = userInterface?.getUser;

  useEffect(() => {
    setPresentingElement(pageRef.current);
  }, []);

  const headerProps = {
    left: [{ name: "back" }],
    title: "My Profile",
    right: [
      { name: "notification", onClick: () => {} },
      {
        name: "settings",
        id: isUserLoggedIn ? "open-edit-profile-modal" : "",
        onClick: () => {
          if (isUserLoggedIn) return;

          api({
            type: "guard",
            message: "Available to registered users, please login.",
          });
        },
      },
    ],
  };

  console.log(headerProps);

  return (
    <IonPage id="profile" ref={pageRef} className="primaryPage">
      <Header {...headerProps} />
      <IonContent className={styles.pageWrapper}>
        {onRefresh && <PageRefresher onRefresh={onRefresh} />}
        <UserMainInfo
          userData={userData}
          openAvatarEditorModal={openAvatarEditorModal}
        />
        <UserProfileInfo userData={userData} />
        <UserStatistics userData={userData} />
        <UserCertificates />
        {isUserLoggedIn && (
          <IonModal
            ref={editUserDataModalRef}
            className={styles.editDataModal}
            trigger="open-edit-profile-modal"
            presentingElement={presentingElement!}
            mode="ios"
          >
            <EditProfileData
              closeModal={closeEditUserDataModal}
              openAvatarEditorModal={openAvatarEditorModal}
            />
          </IonModal>
        )}
        <SheetModalAuto refModal={editUserAvatarRef} keyboardClose={false}>
          <UserAvatarEditor closeModal={closeEditAvatarModal} />
        </SheetModalAuto>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
