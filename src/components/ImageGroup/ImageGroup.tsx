import { FC } from "react";
import { serverName } from "../../http/server";
import styles from "./ImageGroup.module.scss";
import { IonModal } from "@ionic/react";
import { Image } from "antd";

type Image = {
  filename: string;
  file_size: number;
  file_path: string;
  file_id: number;
  download_allowed?: boolean;
  file_description?: string | null;
};

const ImageGroup: FC<{ imagesData?: Image[] }> = ({ imagesData }) => {

  return (
    <>
      <ul className={styles.imageGroup}>
        {imagesData &&
          imagesData.map((image) => (
            <li key={image.file_id} className={styles.groupItem}>
              {/* <img
                src={`${serverName}/${image.file_path}`}
                alt={image.filename}
                className={styles.image}
              /> */}
              <Image src={`${serverName}/${image.file_path}`} alt={image.filename} className={styles.image}/>
              <div className={styles.description}>
                {image.file_description || "No discription provided"}
              </div>
            </li>
          ))}
      </ul>
      <IonModal>
        
      </IonModal>
    </>
  );
};

export default ImageGroup;
