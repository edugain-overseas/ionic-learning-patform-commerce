import { IonMenuToggle, useIonRouter } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import TextOverrflowEllipsis from "../TextOverrflowEllipsis/TextOverrflowEllipsis";
import styles from "./UserInfo.module.scss";
import React, { ReactElement } from "react";

const Container: React.FC<{ isUser: boolean; children: ReactElement }> = ({
  isUser,
  children,
}) => {
  return isUser ? <IonMenuToggle>{children}</IonMenuToggle> : <>{children}</>;
};

const UserInfo = () => {
  const userData = useUser()?.user;
  const router = useIonRouter();

  const handleClick = () => {
    userData?.username && router.push("/my-profile");
  };

  console.log(userData);

  const certificatesAmount = userData?.certificates.flatMap((catCert) =>
    catCert.course_certificate_data.filter(
      (course) => course.course_status === "completed"
    )
  ).length;

  return (
    <Container isUser={!!userData?.userId}>
      <div className={styles.wrapper} onClick={handleClick}>
        <Avatar editable={false} size={64} src={userData?.avatarURL} />
        <div className={styles.infoWrapper}>
          <span>Username:</span>
          <span className={styles.fullName}>
            {userData?.username === "" ? "User Name" : userData?.username}
          </span>
          <div className={styles.studyInfo}>
            <TextOverrflowEllipsis
              text={`${userData?.courses?.length} course`}
            />
            <TextOverrflowEllipsis text={`${certificatesAmount} certificate`} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserInfo;
