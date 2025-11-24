import React from "react";
import { IonIcon } from "@ionic/react";
import { CertificateItemDataType } from "./CertificateList";
import PreviewIcon from "../../assets/icons/eye-in-square.svg";
import DownloadIcon from "../../assets/icons/document-download-certificate.svg";
import BuyCourseBtn from "../BuyCourseBtn/BuyCourseBtn";
import styles from "./CertificateList.module.scss";

const CertificatePreviewBtn = ({ link }: { link: string }) => {
  return (
    <button className={styles.certificateBtn}>
      <IonIcon src={PreviewIcon} />
    </button>
  );
};

const CertificateDownloadBtn = ({
  link,
  name,
}: {
  link: string;
  name: string;
}) => {
  return (
    <a href={link} download={name} className={styles.certificateBtn}>
      <IonIcon src={DownloadIcon} />
    </a>
  );
};

const Buttons = ({ data }: { data: CertificateItemDataType }) => {
  console.log(data);

  const courseBtns = () => {
    if (data.status === null) {
      return data.courseId && <BuyCourseBtn courseId={data.courseId} />;
    }
    if (data.status === "completed" && data.certificateLink) {
      return (
        <>
          <CertificatePreviewBtn link={data.certificateLink} />
          <CertificateDownloadBtn
            link={data.certificateLink}
            name={data.name}
          />
        </>
      );
    }
    return null;
  };

  const categoryBtns = () => {
    if (data.certificateLink) {
      return (
        <>
          <CertificatePreviewBtn link={data.certificateLink} />
          <CertificateDownloadBtn
            link={data.certificateLink}
            name={data.name}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className={styles.btnsWrapper}>
      {data.type === "category" ? categoryBtns() : courseBtns()}
    </div>
  );
};

export default Buttons;
