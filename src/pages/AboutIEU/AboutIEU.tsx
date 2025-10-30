import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
} from "@ionic/react";
import React from "react";
import back from "../../assets/icons/header/back.svg";
import logo from "../../assets/icons/logoIEU-short.svg";
import poster from "../../assets/images/about-ieu.png";
import textIcon from "../../assets/images/TextIcon.png";
import styles from "./AboutIEU.module.scss";
import StickyScrollLayout from "../../components/StickyScrollLayout/StickyScrollLayout";

const AboutIEU: React.FC = () => {
  return (
    <IonPage className="primaryPage">
      <IonHeader className={styles.header} mode="ios">
        <IonBackButton
          defaultHref="/"
          text={""}
          icon={back}
          className={styles.bakcBtn}
        />
      </IonHeader>
      <IonContent className={styles.content} scrollY={false}>
        <StickyScrollLayout
          topLabel="About University"
          posterSrc={poster}
          topScrollStartPosition={190}
        >
          <div className={styles.contentInner}>
            <div className={`${styles.contentHeader} ${styles.contentBlock}`}>
              <div className={`${styles.titleWrapper} ${styles.titlePrimary}`}>
                <span className={styles.title}>About IEU</span>
              </div>
              <IonImg src={logo} className={styles.headerIcon} />
            </div>
            <div className={styles.textBlock}>
              <IonImg src={textIcon} className={styles.floatIcon} />
              <p>
                Welcome to the website of the{" "}
                <b>International European University</b>. We are the most modern
                multidisciplinary University in Malta and the European Union. We
                offer English-taught medical programs, professional degrees in
                Malta, and affordable medical internships <b>in Europe</b>.
              </p>
              <p>
                <b>International European University</b>, is excited to welcome{" "}
                <b>
                  new international students and foreign exchange students from
                  Europe
                </b>{" "}
                and all over the world! Are you ready to study MBBS in Gzira,
                undertake medical internships in Malta and Europe, challenge old
                ideas, and develop the world around you by collaborating with
                brilliant minds and the best practitioners?
              </p>
              <p>
                We are the <b>right choice for you</b>! What is the best
                university to study medicine in Malta? Sure, International
                European University, Malta Campus is the best option for
                students seeking to pursue an MBBS course in Malta.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <div className={`${styles.titleWrapper} ${styles.titleMargin}`}>
                <span className={styles.title}>Our Mission</span>
              </div>
            </div>
            <div className={styles.textBlock}>
              <p>
                Provide international students of the{" "}
                <b>International European University</b> in Malta with the best
                facilities, knowledge, technologies, and internships in Malta to
                make the world a better place for everyone. IEU, Malta Campus's
                student community is an active participant. Student community is
                an active participant.
              </p>
            </div>

            <div className={styles.textBlock}>
              <p>
                Provide international students of the{" "}
                <b>International European University</b> in Malta with the best
                facilities, knowledge, technologies, and internships in Malta to
                make the world a better place for everyone. IEU, Malta Campus's
                student community is an active participant. Student community is
                an active participant.
              </p>
            </div>
          </div>
        </StickyScrollLayout>
      </IonContent>
    </IonPage>
  );
};

export default AboutIEU;
