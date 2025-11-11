import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { UserType } from "../../types/user";
import { convertMillisecondsToHoursAndMinutes } from "../../utils/millisecondsToSrt";
import ClockIcon from "../../assets/icons/clock.svg";
import TaskProgressIcon from "../../assets/icons/task-progress.svg";
import TaskCompletedIcon from "../../assets/icons/task-completed.svg";
import EditIcon from "../../assets/icons/pencil-filled.svg";
import Avatar from "../../components/Avatar/Avatar";
import TextOverrflowEllipsis from "../../components/TextOverrflowEllipsis/TextOverrflowEllipsis";
import styles from "./UserProfile.module.scss";

const UserMainInfo: FC<{
  userData?: UserType;
  openAvatarEditorModal: () => void;
}> = ({ userData, openAvatarEditorModal }) => {
  const { hours, minutes } = userData
    ? convertMillisecondsToHoursAndMinutes(userData?.activeTime)
    : { hours: 0, minutes: 0 };

  return (
    <div className={styles.mainInfoBlock}>
      <div className={styles.topWrapper}>
        <span className={styles.blockLable}>Information</span>
        <div className={styles.avatarInner}>
          <Avatar src={userData?.avatarURL} size={94} editable={false} />
          <button
            className={styles.editAvatarBtn}
            onClick={openAvatarEditorModal}
          >
            <IonIcon src={EditIcon} />
          </button>
        </div>
        <div className={styles.usernameWrapper}>
          <span className={styles.usernameLabel}>
            <TextOverrflowEllipsis text="Username:" />
          </span>
          <span className={styles.username}>
            <TextOverrflowEllipsis
              text={userData?.username ? userData.username : "Name"}
            />
          </span>
        </div>
      </div>
      <ul className={styles.achives}>
        <li className={styles.achiveItem}>
          <IonIcon src={ClockIcon} className={styles.achiveIcon} />
          <span className={styles.achiveValue}>
            <TextOverrflowEllipsis text={`${hours}h ${minutes}m`} />
          </span>
          <span className={styles.achiveLabel}>
            <TextOverrflowEllipsis text="studying time" />
          </span>
        </li>
        <li className={styles.achiveItem}>
          <IonIcon src={TaskProgressIcon} className={styles.achiveIcon} />
          <span className={styles.achiveValue}>
            <TextOverrflowEllipsis
              text={`${userData?.courses?.length} course${
                userData?.courses && userData.courses.length > 1 ? "s" : ""
              }`}
            />
          </span>
          <span className={styles.achiveLabel}>
            <TextOverrflowEllipsis text="in progress" />
          </span>
        </li>
        <li className={styles.achiveItem}>
          <IonIcon src={TaskCompletedIcon} className={styles.achiveIcon} />
          <span className={styles.achiveValue}>
            <TextOverrflowEllipsis
              text={`${
                userData?.courses &&
                userData?.courses.filter(({ status }) => status === "completed")
                  .length
              } completed`}
            />
          </span>
          <span className={styles.achiveLabel}>
            <TextOverrflowEllipsis text="courses" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserMainInfo;
