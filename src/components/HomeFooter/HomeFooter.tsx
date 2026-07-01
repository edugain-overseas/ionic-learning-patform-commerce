import { FC } from "react";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import InsetBtn from "../InsetBtn/InsetBtn";
import WhatsupIcon from "../../assets/icons/social/whatsup.svg";
import EmailIcon from "../../assets/icons/social/email.svg";
import LocationIcon from "../../assets/icons/social/location.svg";
import FacebookIcon from "../../assets/icons/social/facebook.svg";
import InstagramIcon from "../../assets/icons/social/instagram.svg";
import LinkedinIcon from "../../assets/icons/social/linkedin.svg";
import YoutubeIcon from "../../assets/icons/social/youtube.svg";
import TiktokIcon from "../../assets/icons/social/tiktok.svg";
import styles from "./HomeFooter.module.scss";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import SheetModalAuto from "../SheetModalAuto/SheetModalAuto";
import ContactForm from "../ContactForm/ContactForm";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const HomeFooter: FC = () => {
  const isAuthorized = useUser()?.user.accessToken;

  return (
    <>
      <footer className={styles.footer}>
        <p>
          <b>If you have any additional questions</b> and want to get additional
          advice, our specialists will be able to provide you with the necessary
          support when working or starting to work on the IEU educational
          platform. We are always happy to help you.
        </p>
        <button
          className={`${styles.contactFormOpenBtn} ion-activatable`}
          id="footer-open-contact-form"
        >
          <span>Contact Us</span>
          <IonRippleEffect></IonRippleEffect>
        </button>
        <ul className={styles.contactLinks}>
          <li>
            <a
              href="https://wa.me/+380964627777"
              target="_blank"
              rel="noreferrer noopener"
            >
              <InsetBtn
                width="32rem"
                height="32rem"
                icon={<IonIcon src={WhatsupIcon} />}
              />
              <div className={styles.linkText}>
                <span className={styles.label}>Phone number:</span>
                <span className={styles.value}>+380 96 462 77 77</span>
              </div>
            </a>
          </li>
          <li>
            <a href="mailto:courses@feu.com.ua">
              <InsetBtn
                width="32rem"
                height="32rem"
                icon={<IonIcon src={EmailIcon} />}
              />
              <div className={styles.linkText}>
                <span className={styles.label}>Email address:</span>
                <span className={styles.value}>courses@feu.com.ua</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/" onClick={(e) => e.preventDefault()}>
              <InsetBtn
                width="32rem"
                height="32rem"
                icon={<IonIcon src={LocationIcon} />}
              />
              <div className={styles.linkText}>
                <span className={styles.label}>Our office:</span>
                <span className={styles.value}>
                  Academician Glushkova Avenue.42, Kyiv 03187
                </span>
              </div>
            </a>
          </li>
        </ul>
        <div className={styles.social}>
          <span className={styles.followText}>Follow us:</span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={FacebookIcon} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={InstagramIcon} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={LinkedinIcon} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={YoutubeIcon} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.preventDefault()}
          >
            <IonIcon src={TiktokIcon} />
          </a>
        </div>
        <EqualSpaceContainer
          containerClassname={`${styles.hepfulLinks} ${
            isAuthorized ? "" : styles.notAuthorized
          }`}
          leftItem={
            <a href="/" onClick={(e) => e.preventDefault()}>
              Privacy policy
            </a>
          }
          rightItem={<Link to="/about">About FEU</Link>}
        />
      </footer>
      <SheetModalAuto trigger="footer-open-contact-form">
        <ContactForm />
      </SheetModalAuto>
    </>
  );
};

export default HomeFooter;
