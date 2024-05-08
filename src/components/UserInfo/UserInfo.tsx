import { useUser } from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import TextOverrflowEllipsis from "../TextOverrflowEllipsis/TextOverrflowEllipsis";
import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  const userData = useUser()?.user;

  return (
    <div className={styles.wrapper}>
      <Avatar editable={false} size={64} src={userData?.avatarURL} />
      <div className={styles.infoWrapper}>
        <span>Username:</span>
        <span className={styles.fullName}>
          {userData?.username === "" ? "User Name" : userData?.username}
        </span>
        <div className={styles.studyInfo}>
          <TextOverrflowEllipsis text={`${userData?.courses.length} course`} />
          <TextOverrflowEllipsis text="0 certificate" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
