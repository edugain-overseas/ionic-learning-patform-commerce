import { FC } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { InstructionType, useCourses } from "../../context/CoursesContext";
import categoryEachIcon from "../../assets/icons/category-each.svg";
import documentIcon from "../../assets/icons/document.svg";
import downloadIcon from "../../assets/icons/download.svg";
import styles from "./Instructions.module.scss";
import { formatFileSize } from "../../utils/formatFileSize";
import { serverName } from "../../http/server";
import AnchorDownload from "../../components/AnchorDownload/AnchorDownload";

const InstructionContent: FC<{ instruction: InstructionType }> = ({
  instruction,
}) => {
  const category = useCourses()?.categories.find(
    (category) => category.id === instruction.category_id
  );
  return (
    <div className={styles.instructionContent}>
      <div className={styles.categoryData}>
        <IonIcon src={categoryEachIcon} />
        <span>
          Category:{" "}
          {instruction.type === "general"
            ? "Administration IEU"
            : category?.title}
        </span>
      </div>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: instruction.text }}
      ></div>
      <div className={styles.filesWrapper}>
        <span className={styles.filesTitle}>Helpful files:</span>
        <ul className={styles.filesList}>
          {instruction.files.map((file) => (
            <li className={styles.fileItem} key={file.id}>
              <IonIcon src={documentIcon} className={styles.documentIcon} />
              <span className={styles.filename} title={file.file_name}>
                {file.file_name}
              </span>
              <span className={styles.filesize}>
                {`(${formatFileSize(file.file_size)})`}
              </span>
              <AnchorDownload
                href={`${serverName}/${file.file_path}`}
                download={file.file_name}
                className={styles.downloadBtn}
              >
                <IonIcon src={downloadIcon} />
              </AnchorDownload>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructionContent;
