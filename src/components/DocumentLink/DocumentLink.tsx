import React from "react";
import DocumentPDFIcon from "../../assets/icons/file.svg";
import DownloadFileIcon from "../../assets/icons/document-download.svg";
import { formatFileSize } from "../../utils/formatFileSize";
import { IonIcon } from "@ionic/react";
import { serverName } from "../../http/server";
import styles from "./DocumentLink.module.scss";

const DocumentLink: React.FC<{
  file: {
    filename?: string;
    file_size: number;
    file_path: string;
  };
}> = ({ file }) => {
  const { filename, file_size, file_path } = file;
  return (
    <div className={styles.attachedDocumentWrapper}>
      <IonIcon src={DocumentPDFIcon} />
      <span className={styles.documentName}>{filename}</span>
      <span className={styles.documentSize}>{`(${formatFileSize(
        file_size
      )})`}</span>
      <a
        download={true}
        href={`${serverName}/${file_path}`}
        className={styles.downloadLink}
        rel="noreferrer noopener"
        target="_blank"
      >
        <IonIcon src={DownloadFileIcon} />
      </a>
    </div>
  );
};

export default DocumentLink;
