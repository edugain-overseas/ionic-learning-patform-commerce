import { useEffect, useState } from "react";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { CertificateItemDataType } from "./CertificateList";
import PreviewIcon from "../../assets/icons/eye-in-square.svg";
import DownloadIcon from "../../assets/icons/document-download-certificate.svg";
import BuyCourseBtn from "../BuyCourseBtn/BuyCourseBtn";
import DocumentDownloadIcon from "../../assets/icons/document-download.svg";
import styles from "./CertificateList.module.scss";
import { downloadFile } from "../../utils/downloadFile";
import { serverName } from "../../http/server";
import SheetModalAuto from "../SheetModalAuto/SheetModalAuto";
import CommonButton from "../CommonButton/CommonButton";
import { pdfToImages } from "../../utils/pdfToImages";

const CertificatePreviewBtn = ({
  link,
  name,
}: {
  link: string;
  name: string;
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const fileUrl = `${serverName}/${link}`;

  useEffect(() => {
    const getImages = async () => {
      const images = await pdfToImages(`${serverName}/${link}`);
      setImages(images);
    };

    getImages();
  }, []);

  return (
    <>
      <button
        className={`${styles.certificateBtn} ion-activatable`}
        onClick={() => setIsPreviewOpen(true)}
      >
        <IonIcon src={PreviewIcon} />
        <IonRippleEffect type="bounded"></IonRippleEffect>
      </button>
      <SheetModalAuto
        isOpen={isPreviewOpen}
        onDidDissmiss={() => setIsPreviewOpen(false)}
      >
        <div className={styles.cetrificateModalWrapper}>
          <div className={styles.certificatesModalHeader}>
            <span>{name}</span>
          </div>
          {images.map((src, index) => (
            <img key={index} src={src} style={{ width: "100%" }} />
          ))}
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
              onClick={() => downloadFile(fileUrl, `${name}.pdf`)}
            />
          </div>
        </div>
      </SheetModalAuto>
    </>
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
    <button
      className={`${styles.certificateBtn} ion-activatable`}
      onClick={() => downloadFile(`${serverName}/${link}`, `${name}.pdf`)}
    >
      <IonIcon src={DownloadIcon} />
      <IonRippleEffect type="bounded"></IonRippleEffect>
    </button>
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
          <CertificatePreviewBtn link={data.certificateLink} name={data.name} />
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
          <CertificatePreviewBtn link={data.certificateLink} name={data.name} />
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
