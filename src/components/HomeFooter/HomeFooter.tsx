import { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { useClipboardCopy } from "../../hooks/useClipboardCopy";
import InsetBtn from "../InsetBtn/InsetBtn";
import WhatsupIcon from "../../assets/icons/social/whatsup.svg";
import EmailIcon from "../../assets/icons/social/email.svg";
import LocationIcon from "../../assets/icons/social/location.svg";
import FacebookIcon from "../../assets/icons/social/facebook.svg";
import InstagramIcon from "../../assets/icons/social/instagram.svg";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import SheetModalAuto from "../SheetModalAuto/SheetModalAuto";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./HomeFooter.module.scss";

const OFFICE_ADDRESS = "Academician Glushkova Avenue.42, Kyiv 03187";

const HomeFooter: FC = () => {
  const isAuthorized = useUser()?.user.accessToken;
  const [copy] = useClipboardCopy();

  const handleAdressClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    copy(OFFICE_ADDRESS, { successMessage: "Address copied" });
  };

  return (
    <>
      <footer className={styles.footer}>
        <p>
          <b>If you have any additional questions</b> and want to get additional
          advice, our specialists will be able to provide you with the necessary
          support when working or starting to work on the FEU educational
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
            <a href="/" onClick={handleAdressClick}>
              <InsetBtn
                width="32rem"
                height="32rem"
                icon={<IonIcon src={LocationIcon} />}
              />
              <div className={styles.linkText}>
                <span className={styles.label}>Our office:</span>
                <span className={styles.value}>{OFFICE_ADDRESS}</span>
              </div>
            </a>
          </li>
        </ul>
        <div className={styles.social}>
          <span className={styles.followText}>Follow us:</span>
          <a
            href="https://www.facebook.com/profile.php?id=61591024424081"
            target="_blank"
            rel="noreferrer noopener"
          >
            <IonIcon src={FacebookIcon} />
          </a>
          <a
            href="https://www.instagram.com/feu.courses/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <IonIcon src={InstagramIcon} />
          </a>
          {/* <a
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
          </a> */}
        </div>
        <EqualSpaceContainer
          containerClassname={`${styles.hepfulLinks} ${
            isAuthorized ? "" : styles.notAuthorized
          }`}
          leftItem={<Link to="/privacy-policy">Privacy policy</Link>}
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
