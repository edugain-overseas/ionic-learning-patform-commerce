import React, { useRef } from "react";
import EditIcon from "../../assets/icons/tabs/my-profile.svg";
import styles from "./Avatar.module.scss";
import AvatarFallback from "./AvatarFallback/AvatarFallback";
import { IonIcon } from "@ionic/react";

interface AvatarTypes {
  size?: number;
  src?: string;
  handleUpload?: (file: File) => void;
  editable?: boolean;
  alt?: string;
}

const Avatar: React.FC<AvatarTypes> = ({
  size = 76,
  src,
  handleUpload = () => {},
  editable = true,
  alt,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      const file: File = fileList[0];
      console.log("Selected file:", file);
      handleUpload(file);
    }
  };

  return (
    <div
      className={styles.avatarWrapper}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: editable ? "auto" : "none",
      }}
    >
      {src ? <img src={src} alt={alt} /> : <AvatarFallback size={size} />}
      <button
        className={styles.editBtn}
        onClick={() => inputRef.current?.click()}
      >
        <IonIcon src={EditIcon} />
        <span>Edit</span>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </button>
    </div>
  );
};

export default Avatar;
