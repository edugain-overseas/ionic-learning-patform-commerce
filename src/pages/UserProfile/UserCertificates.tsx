import { FC, useState } from "react";
import { certificates } from "../../constants";
import { useUser } from "../../context/UserContext";
import { useObserver } from "../../hooks/useObserver";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import Auth from "../../components/Auth/Auth";
import UnauthorizedUserContentFallback from "../../components/UnauthorizedUserContentFallback/UnauthorizedUserContentFallback";
import CertificateList from "../../components/CertificateList/CertificateList";
import styles from "./UserProfile.module.scss";

const pagination = {
  clickable: true,
  renderBullet: function (_: any, className: string) {
    return `<span class="${className} ${styles.customBullet}"></span>`;
  },
};

const UserCertificates: FC = () => {
  const isUserLoggedIn = useUser()?.user.accessToken !== null;

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const { isIntersecting } = entries[0];
    const authPanel = document.querySelector(`.${styles.authPanel}`);
    if (isIntersecting) {
      authPanel?.classList.add(styles.shown);
    } else {
      authPanel?.classList.remove(styles.shown);
    }
  };

  const wrapperRef = useObserver<HTMLDivElement>(
    !isUserLoggedIn,
    observerCallback,
    {
      root: document.querySelector(`.${styles.pageWrapper}`),
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  return (
    <>
      <div className={styles.certificatesData} ref={wrapperRef}>
        <div className={styles.certificatesHeader}>
          <span className={styles.certificatesTitle}>
            Certificates of completed courses
          </span>
          <InfoBtn info="Certificates" />
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
