import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { useObserver } from "../../hooks/useObserver";
import WebIcon from "../../assets/icons/social/web.svg";
import AppstoreIcon from "../../assets/icons/social/app-store.svg";
import Playmarketcon from "../../assets/icons/social/play-market.svg";
import styles from "./HomeOfferInfo.module.scss";

const HomeOfferInfo: FC = () => {
  const observerCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      containerRef.current?.classList.add(styles.animated);
    }
  };
  const observerOptions: IntersectionObserverInit = {
    root: document.getElementById("home-content"),
    rootMargin: "0px",
    threshold: 0,
  };
  const containerRef = useObserver<HTMLDivElement>(
    true,
    observerCallback,
    observerOptions
  );
  return (
    <div className={styles.container}>
      <div className={styles.visualContentContainer} ref={containerRef}>
        <div className={styles.desktop}></div>
        <div className={styles.mobile}></div>
      </div>
      <div className={styles.textContainer}>
        <h3>Categories of Courses</h3>
        <p>
          Enhance your <b>professional knowledge and skills through</b> a wide
          range of online courses and programs designed to meet your needs.
          <br />
          <br />
          Choose from various subjects and fields to advance your expertise at
          your own pace, all from the <b>comfort of your home or office</b>.
          Upon completing your chosen courses, you will receive an official
          online certificate that validates your efforts and accomplishments.
          <br />
          <br />
          Empower yourself with the{" "}
          <b>flexibility to learn anytime, anywhere, and achieve</b> your
          professional goals.
        </p>
        <div className={styles.links}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <IonIcon src={WebIcon} />
            {/* <span className={styles.label}>Website</span> */}
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <IonIcon src={AppstoreIcon} />
            {/* <span className={styles.label}>App Store</span> */}
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <IonIcon src={Playmarketcon} />
            {/* <span className={styles.label}>Google play</span> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeOfferInfo;
