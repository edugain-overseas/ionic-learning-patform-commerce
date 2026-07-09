import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React from "react";
import WhatsupIcon from "../../assets/icons/social/whatsup.svg";
import EmailIcon from "../../assets/icons/social/email.svg";
import LocationIcon from "../../assets/icons/social/location.svg";
import FacebookIcon from "../../assets/icons/social/facebook.svg";
import InstagramIcon from "../../assets/icons/social/instagram.svg";
import Header from "../../components/Header/Header";
import InsetBtn from "../../components/InsetBtn/InsetBtn";
import styles from "../../components/HomeFooter/HomeFooter.module.scss";
import contactStyles from "./Contacts.module.scss";

const headerProps = {
  left: [{ name: "back" }],
  title: "Contacts",
};

const Contacts: React.FC = () => {
  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent className={contactStyles.contactsContent}>
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
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
