import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import styles from "./UserAvatarEditor.module.scss";

const AvatarEditorComponent: React.FC<{
  image: string | File;
  editorRef: React.RefObject<AvatarEditor>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}> = ({ image, editorRef, scale, setScale }) => {
  const lastDistance = useRef<number | null>(null);

  const getDistance = (touches: React.TouchList): number => {
    const a = touches[0];
    const b = touches[1];

    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 2) return;

    const distance = getDistance(e.touches);

    if (lastDistance.current !== null) {
      const diff = distance - lastDistance.current;

      setScale((prev) => {
        const next = prev + diff * 0.005;
        return Math.min(3, Math.max(1, next));
      });
    }

    lastDistance.current = distance;
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
  };

  return (
    <div
      className={styles.avatarEditorWrapper}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
        scale={scale}
      />
    </div>
  );
};

export default AvatarEditorComponent;
