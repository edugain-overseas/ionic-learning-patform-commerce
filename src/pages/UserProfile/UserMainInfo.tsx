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

  const userCoursesCompleted =
    userData?.courses.filter((course) => course.status === "completed") || [];

  const userCoursesInProgress =
    userData?.courses.filter((course) => course.status === "in_progress") || [];

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
              text={`${userCoursesInProgress.length} course${
                userCoursesInProgress.length > 1 ? "s" : ""
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
              text={`${userCoursesCompleted.length} course${
                userCoursesCompleted.length > 1 ? "s" : ""
              }`}
            />
          </span>
          <span className={styles.achiveLabel}>
            <TextOverrflowEllipsis text="completed" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserMainInfo;
