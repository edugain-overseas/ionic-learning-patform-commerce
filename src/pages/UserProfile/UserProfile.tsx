import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { certificates } from "../../constants";
import ClockIcon from "../../assets/icons/clock.svg";
import DocumentDownloadIcon from "../../assets/icons/document-download.svg";
import TaskProgressIcon from "../../assets/icons/task-progress.svg";
import TaskCompletedIcon from "../../assets/icons/task-completed.svg";
import Header from "../../components/Header/Header";
import Avatar from "../../components/Avatar/Avatar";
import TextOverrflowEllipsis from "../../components/TextOverrflowEllipsis/TextOverrflowEllipsis";
import Accordion from "../../components/Accordion/Accordion";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";
import CommonButton from "../../components/CommonButton/CommonButton";
import styles from "./UserProfile.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import EditProfileData from "../../components/EditProfileData/EditProfileData";
import { useUser } from "../../context/UserContext";
import { serverName } from "../../http/server";
import { getCountryByCode } from "../../utils/countries";
import UserAvatarEditor from "../../components/UserAvatarEditor/UserAvatarEditor";

// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const pagination = {
  clickable: true,
  renderBullet: function (_: any, className: string) {
    return `<span class="${className} ${styles.customBullet}"></span>`;
  },
};

const UserProfile: React.FC = () => {
  const userInterface = useUser();
  const userData = userInterface?.user;
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [isOpenModalCerficate, setIsOpenModalCerficate] = useState(false);
  const editUserDataModalRef = useRef<HTMLIonModalElement>(null);
  const editUserAvatarRef = useRef<HTMLIonModalElement>(null);

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

  const handleCertificateClick = (index: number) => {
    setCertificateIndex(index);
    setIsOpenModalCerficate(true);
  };

  const handleUploadCertificate = async () => {
    const fileUrl = "https://pdfobject.com/pdf/sample.pdf";

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const fileName = "certificate.pdf";

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      a.remove();

      // await Filesystem.writeFile({
      //   path: fileName,
      //   data: blob,
      //   directory: Directory.Documents, // Save in downloads directory
      //   encoding: Encoding.UTF8,
      // });

      console.log("File downloaded successfully:", fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const headerProps = {
    left: [{ name: "back" }],
    title: "My Profile",
    right: [
      { name: "notification", onClick: () => {} },
      { name: "settings", id: "open-edit-profile-modal", onClick: () => {} },
    ],
  };

  return (
    <IonPage>
      <Header {...headerProps} />
      <IonContent className={styles.pageWrapper}>
        <div className={styles.mainInfoBlock}>
          <div className={styles.topWrapper}>
            <span className={styles.blockLable}>Information</span>
            <div className={styles.avatarInner}>
              <Avatar src={userData?.avatarURL} size={94} editable={false} />
            </div>
            <div className={styles.usernameWrapper}>
              <span className={styles.usernameLabel}>
                <TextOverrflowEllipsis text="Username:" />
              </span>
              <span className={styles.username}>
                {userData && (
                  <TextOverrflowEllipsis text={userData?.username} />
                )}
              </span>
            </div>
          </div>
          <ul className={styles.achives}>
            <li className={styles.achiveItem}>
              <IonIcon src={ClockIcon} className={styles.achiveIcon} />
              <span className={styles.achiveValue}>
                <TextOverrflowEllipsis text="12h 12m" />
              </span>
              <span className={styles.achiveLabel}>
                <TextOverrflowEllipsis text="studying time" />
              </span>
            </li>
            <li className={styles.achiveItem}>
              <IonIcon src={TaskProgressIcon} className={styles.achiveIcon} />
              <span className={styles.achiveValue}>
                <TextOverrflowEllipsis
                  text={`${userData?.courses.length} course${
                    userData?.courses && userData.courses.length > 1 ? "s" : ""
                  }`}
                />
              </span>
              <span className={styles.achiveLabel}>
                <TextOverrflowEllipsis text="in progress" />
              </span>
            </li>
            <li className={styles.achiveItem}>
              <IonIcon src={TaskCompletedIcon} className={styles.achiveIcon} />
              <span className={styles.achiveValue}>
                <TextOverrflowEllipsis
                  text={`${
                    userData?.courses &&
                    userData?.courses.filter(
                      ({ status }) => status === "completed"
                    ).length
                  } completed`}
                />
              </span>
              <span className={styles.achiveLabel}>
                <TextOverrflowEllipsis text="courses" />
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.profileData}>
          <Accordion
            header={
              <div className={styles.profileDataHeader}>
                <span className={styles.mainTitle}>Profile data</span>
                <span className={styles.secondaryTitle}>Details</span>
              </div>
            }
            content={
              <ul className={styles.profileDetails}>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Username:</span>
                  <span className={styles.value}>{userData?.username}</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>First Name:</span>
                  <span className={styles.value}>
                    {userData?.name === "" ? "None" : userData?.name}
                  </span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Last Name:</span>
                  <span className={styles.value}>
                    {userData?.surname === "" ? "None" : userData?.surname}
                  </span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{userData?.email}</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Password:</span>
                  <span className={styles.value}>********</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Phone namber:</span>
                  <span className={styles.value}>
                    {userData?.phone === "" || !userData?.phone
                      ? "None"
                      : userData?.phone}
                  </span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Your country:</span>
                  <span className={styles.value}>
                    {userData?.country === "" || !userData?.country
                      ? "None"
                      : getCountryByCode(userData.country)}
                  </span>
                </li>
              </ul>
            }
          />
        </div>
        <div className={styles.progressData}>
          <div className={styles.gradeWrapper}>
            <CircleProgressCard
              cardTitle="Grade Point Average"
              width={90}
              strokeWidth={4}
              strokeColor="#FCC400"
              progressTitle={
                <div className={styles.progressContent}>
                  <span className={styles.label}>Average</span>
                  <span className={styles.value}>172(B)</span>
                </div>
              }
            />
          </div>
          <div className={styles.progressWrapper}>
            <CircleProgressCard
              cardTitle="Your progress"
              width={90}
              strokeWidth={4}
              strokeColor="#39ba6d"
              progressTitle={
                <div className={styles.progressContent}>
                  <span className={styles.label}>Completed</span>
                  <span className={styles.value}>75%</span>
                </div>
              }
            />
          </div>
        </div>
        <div className={styles.certificatesData}>
          <div className={styles.certificatesHeader}>
            <span className={styles.certificatesTitle}>
              Certificates of completed courses
            </span>
            <InfoBtn info="Certificates" id="Certificates" />
          </div>
          <ul className={styles.certificatesList}>
            {certificates.map(({ name }, index) => (
              <li
                className={styles.certificateItem}
                key={name}
                id="certificate"
                onClick={() => handleCertificateClick(index)}
              >
                <span className={styles.certificateTitle}>{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <SheetModalAuto
          isOpen={isOpenModalCerficate}
          onDidDissmiss={() => setIsOpenModalCerficate(false)}
        >
          <div className={styles.cetrificateModalWrapper}>
            <div className={styles.certificatesModalHeader}>
              <span>{certificates[certificateIndex].name}</span>
            </div>
            <Swiper
              className={styles.swiper}
              spaceBetween={24}
              centeredSlides={true}
              slidesPerView={"auto"}
              pagination={pagination}
              modules={[Pagination]}
            >
              {certificates[certificateIndex].images.map(({ src }, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                  <img src={src} key={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.certificateModalDownload}>
              <CommonButton
                width={132}
                height={32}
                backgroundColor="transparent"
                borderRadius={5}
                border="1px solid #7E8CA8"
                label="Certificate"
                icon={
                  <IonIcon
                    src={DocumentDownloadIcon}
                    className={styles.docDownloadIcon}
                  />
                }
                onClick={handleUploadCertificate}
              />
            </div>
          </div>
        </SheetModalAuto>
        <SheetModalAuto
          trigger="open-edit-profile-modal"
          className={styles.editDataModal}
          refModal={editUserDataModalRef}
        >
          <EditProfileData
            closeModal={closeEditUserDataModal}
            openAvatarEditorModal={openEditAvatarModal}
          />
        </SheetModalAuto>
        <SheetModalAuto refModal={editUserAvatarRef} keyboardClose={false}>
          <UserAvatarEditor closeModal={closeEditAvatarModal} />
        </SheetModalAuto>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
