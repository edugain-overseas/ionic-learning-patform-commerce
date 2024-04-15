import { IonContent, IonIcon, IonModal, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { certificates } from "../../constants";
import avatar from "../../assets/images/subject_image.png";
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
import CommonButton from "../../components/CommonButton/CommonButton";
import styles from "./UserProfile.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const pagination = {
  clickable: true,
  renderBullet: function (_: any, className: string) {
    return `<span class="${className} ${styles.customBullet}"></span>`;
  },
};

const UserProfile: React.FC = () => {
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [isOpenModalCerficate, setIsOpenModalCerficate] = useState(false);

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

      // Show success message or perform any other action upon successful download
      console.log("File downloaded successfully:", fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <IonPage>
      <Header
        left={["back"]}
        title="My Profile"
        right={["notification", "settings"]}
      />
      <IonContent className={styles.pageWrapper}>
        <div className={styles.mainInfoBlock}>
          <div className={styles.topWrapper}>
            <span className={styles.blockLable}>Information</span>
            <div className={styles.avatarInner}>
              <Avatar src={avatar} size={94} editable={false} />
            </div>
            <div className={styles.usernameWrapper}>
              <span className={styles.usernameLabel}>
                <TextOverrflowEllipsis text="Username:" />
              </span>
              <span className={styles.username}>
                <TextOverrflowEllipsis text="Sam James" />
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
                <TextOverrflowEllipsis text="4 courses" />
              </span>
              <span className={styles.achiveLabel}>
                <TextOverrflowEllipsis text="in progress" />
              </span>
            </li>
            <li className={styles.achiveItem}>
              <IonIcon src={TaskCompletedIcon} className={styles.achiveIcon} />
              <span className={styles.achiveValue}>
                <TextOverrflowEllipsis text="3 completed" />
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
                  <span className={styles.value}>Sam James</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>First Name:</span>
                  <span className={styles.value}>Sam</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Last Name:</span>
                  <span className={styles.value}>James</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>samj_ames20@gmail.com</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Password:</span>
                  <span className={styles.value}>********</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Phone namber:</span>
                  <span className={styles.value}>+380669209415</span>
                </li>
                <li className={styles.profileDataItem}>
                  <span className={styles.label}>Your country:</span>
                  <span className={styles.value}>Ukraine</span>
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
        <IonModal
          className={styles.certificateModal}
          isOpen={isOpenModalCerficate}
          onDidDismiss={() => setIsOpenModalCerficate(false)}
          breakpoints={[0, 1]}
          initialBreakpoint={1}
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
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
