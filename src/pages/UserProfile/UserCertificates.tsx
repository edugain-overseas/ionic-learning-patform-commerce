import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { certificates } from "../../constants";
import { useUser } from "../../context/UserContext";
import { useObserver } from "../../hooks/useObserver";
import DocumentDownloadIcon from "../../assets/icons/document-download.svg";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import SheetModalAuto from "../../components/SheetModalAuto/SheetModalAuto";
import Auth from "../../components/Auth/Auth";
import UnauthorizedUserContentFallback from "../../components/UnauthorizedUserContentFallback/UnauthorizedUserContentFallback";
import styles from "./UserProfile.module.scss";

// import required modules
import { Pagination } from "swiper/modules";
import CommonButton from "../../components/CommonButton/CommonButton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const pagination = {
  clickable: true,
  renderBullet: function (_: any, className: string) {
    return `<span class="${className} ${styles.customBullet}"></span>`;
  },
};

const UserCertificates: FC = () => {
  const isUserLoggedIn = useUser()?.user.accessToken !== null;
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [isOpenModalCerficate, setIsOpenModalCerficate] = useState(false);

  const handleCertificateClick = (index: number) => {
    setCertificateIndex(index);
    setIsOpenModalCerficate(true);
  };

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const { isIntersecting } = entries[0];
    const authPanel = document.querySelector(`.${styles.authPanel}`);
    if (isIntersecting) {
      authPanel?.classList.add(styles.shown);
    } else {
      authPanel?.classList.remove(styles.shown);
    }
  };

  const wrapperRef = useObserver<HTMLDivElement>(
    !isUserLoggedIn,
    observerCallback,
    {
      root: document.querySelector(`.${styles.pageWrapper}`),
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

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

  return (
    <>
      <div className={styles.certificatesData} ref={wrapperRef}>
        <div className={styles.certificatesHeader}>
          <span className={styles.certificatesTitle}>
            Certificates of completed courses
          </span>
          <InfoBtn info="Certificates" id="Certificates" />
        </div>
        {isUserLoggedIn ? (
          <ul className={styles.certificatesList}>
            {certificates.map(({ name }, index) => (
              <li
                className={`${styles.certificateItem} ion-activatable`}
                key={name}
                id="certificate"
                onClick={() => handleCertificateClick(index)}
              >
                <span className={styles.certificateTitle}>{name}</span>
                <IonRippleEffect></IonRippleEffect>
              </li>
            ))}
          </ul>
        ) : (
          <UnauthorizedUserContentFallback />
        )}
      </div>
      {isUserLoggedIn ? (
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
                border="1rem solid #7E8CA8"
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
      ) : (
        <Auth containerClassname={styles.authPanel} />
      )}
    </>
  );
};

export default UserCertificates;
