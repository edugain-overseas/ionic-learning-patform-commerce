import { FC } from "react";
import styles from "./UserProfile.module.scss";
import Accordion from "../../components/Accordion/Accordion";
import { getCountryByCode } from "../../utils/countries";
import { UserType } from "../../types/user";

const UserProfileInfo: FC<{ userData?: UserType }> = ({ userData }) => {
  console.log(userData);

  return (
    <div className={styles.profileData}>
      <Accordion
        header={
          <div className={styles.profileDataHeader}>
            <span className={styles.mainTitle}>Profile data</span>
            <span className={styles.secondaryTitle}>Details</span>
          </div>
        }
        content={
          <ul className={styles.profileDetails}>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Username:</span>
              <span className={styles.value}>
                {userData?.username === "" ? "-" : userData?.username}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>First Name:</span>
              <span className={styles.value}>
                {userData?.name === "" ? "-" : userData?.name}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Last Name:</span>
              <span className={styles.value}>
                {userData?.surname === "" ? "-" : userData?.surname}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>
                {userData?.email === "" ? "-" : userData?.email}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Password:</span>
              <span className={styles.value}>
                {userData?.username === "" ? "-" : "********"}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Phone namber:</span>
              <span className={styles.value}>
                {userData?.phone === "" || !userData?.phone
                  ? "-"
                  : userData?.phone}
              </span>
            </li>
            <li className={styles.profileDataItem}>
              <span className={styles.label}>Your country:</span>
              <span className={styles.value}>
                {userData?.country === "" || !userData?.country
                  ? "-"
                  : userData.country}
              </span>
            </li>
          </ul>
        }
      />
    </div>
  );
};

export default UserProfileInfo;
