import styles from "./UserInfo.module.scss";
import Avatar from "../Avatar/Avatar";
import TextOverrflowEllipsis from "../TextOverrflowEllipsis/TextOverrflowEllipsis";

const UserInfo = () => {
  const username = "";

  return (
    <div className={styles.wrapper}>
      <Avatar
        editable={false}
        size={64}
        // src={
        //   // userInfo.avatarURL !== ""
        //   //   ? `${serverName}/${userInfo.avatarURL}`
        //   //   : null
        //   null
        // }
      />
      <div className={styles.infoWrapper}>
        <span>Username:</span>
        <span className={styles.fullName}>
          {username === "" ? "User Name" : username}
        </span>
        {/* {accessToken && ( */}
        <div className={styles.studyInfo}>
          <TextOverrflowEllipsis text="0 course" />
          <TextOverrflowEllipsis text="0 certificate" />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default UserInfo;
