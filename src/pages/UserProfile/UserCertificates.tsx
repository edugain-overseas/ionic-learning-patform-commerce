import { FC } from "react";
import { useUser } from "../../context/UserContext";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import Auth from "../../components/Auth/Auth";
import UnauthorizedUserContentFallback from "../../components/UnauthorizedUserContentFallback/UnauthorizedUserContentFallback";
import CertificateList from "../../components/CertificateList/CertificateList";
import styles from "./UserProfile.module.scss";

const UserCertificates: FC = () => {
  const isUserLoggedIn = useUser()?.user.accessToken !== null;

  return (
    <>
      <div className={styles.certificatesData}>
        <div className={styles.certificatesHeader}>
          <span className={styles.certificatesTitle}>
            Certificates of completed courses
          </span>
          <InfoBtn info="Your certificates will always be available here. Track your course progress and completion status anytime." />
        </div>
        {isUserLoggedIn ? (
          <CertificateList />
        ) : (
          <>
            <UnauthorizedUserContentFallback />
            <Auth containerClassname={styles.authPanel} />
          </>
        )}
      </div>
    </>
  );
};

export default UserCertificates;
