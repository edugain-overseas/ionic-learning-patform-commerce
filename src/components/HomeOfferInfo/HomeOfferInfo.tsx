import { FC, MouseEvent, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { useObserver } from "../../hooks/useObserver";
import { platformLinks } from "../../constants/nav";
import { ExternalLink } from "../ExternalLink/ExternalLink";
import desktopImg from "../../assets/images/home_device_desktop.png";
import mobileImg from "../../assets/images/home_device_mobile.png";
import styles from "./HomeOfferInfo.module.scss";

const PlartofrmLink: FC<{ link: (typeof platformLinks)[0] }> = ({ link }) => {
  const [isActive, setIsActive] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isActive) return;
    e.preventDefault();
    if (spanRef.current) {
      spanRef.current.style.maxWidth = `calc(${spanRef.current.scrollWidth}px + 8rem)`;
      spanRef.current.style.paddingLeft = `8rem`;
    }
    setIsActive(true);
  };

  return (
    <ExternalLink href={isActive ? link.href : "/"} onClick={handleClick}>
      <IonIcon src={link.iconSrc} />
      <span className={styles.label} ref={spanRef}>
        {link.label}
      </span>
    </ExternalLink>
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
    observerOptions,
  );
  return (
    <div className={styles.container}>
      <div className={styles.visualContentContainer} ref={containerRef}>
        <div className={styles.desktop}>
          <img
            src={desktopImg}
            className={styles.deviceImg}
            alt="Desktop Device"
            loading="eager"
          />
        </div>
        <div className={styles.mobile}>
          <img
            src={mobileImg}
            className={styles.deviceImg}
            alt="Mobile Device"
            loading="eager"
          />
        </div>
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
          {platformLinks.map((link) => (
            <PlartofrmLink key={link.platform} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeOfferInfo;
