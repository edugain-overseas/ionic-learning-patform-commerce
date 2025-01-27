import { FC, useRef } from "react";
import { IonIcon } from "@ionic/react";
import { useObserver } from "../../hooks/useObserver";
import WebIcon from "../../assets/icons/social/web.svg";
import AppstoreIcon from "../../assets/icons/social/app-store.svg";
import Playmarketcon from "../../assets/icons/social/play-market.svg";
import styles from "./HomeOfferInfo.module.scss";

type PlatformType = "web" | "ios" | "android";

const getIconByType = (type: PlatformType) => {
  switch (type) {
    case "web":
      return WebIcon;
    case "ios":
      return AppstoreIcon;
    case "android":
      return Playmarketcon;
    default:
      return;
  }
};
const getlabelByType = (type: PlatformType) => {
  switch (type) {
    case "web":
      return "Website";
    case "ios":
      return "App Store";
    case "android":
      return "Google play";
    default:
      return;
  }
};

const PlartofrmLink: FC<{ type: PlatformType }> = ({ type }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (spanRef.current) {
      console.dir(spanRef.current);
      spanRef.current.style.maxWidth = `calc(${spanRef.current.scrollWidth}px + 8rem)`;
      spanRef.current.style.paddingLeft = `8rem`;
    }
  };

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <IonIcon src={getIconByType(type)} />
      <span className={styles.label} ref={spanRef}>
        {getlabelByType(type)}
      </span>
    </a>
  );
};

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
          <PlartofrmLink type="web" />
          <PlartofrmLink type="ios" />
          <PlartofrmLink type="android" />
        </div>
      </div>
    </div>
  );
};

export default HomeOfferInfo;
