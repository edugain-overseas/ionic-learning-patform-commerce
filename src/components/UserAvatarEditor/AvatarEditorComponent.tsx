import React from "react";
import AvatarEditor from "react-avatar-editor";
import styles from "./UserAvatarEditor.module.scss";

const AvatarEditorComponent: React.FC<{
  image: string | File;
  editorRef: React.RefObject<AvatarEditor>;
}> = ({ image, editorRef }) => {
  return (
    <div className={styles.avatarEditorWrapper}>
      <AvatarEditor
        ref={editorRef}
        image={image}
        onMouseMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        width={200}
        height={200}
        borderRadius={100}
        border={[72, 30]}
        disableHiDPIScaling={true}
      />
    </div>
  );
};

export default AvatarEditorComponent;
