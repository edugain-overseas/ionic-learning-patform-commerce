import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
} from "@ionic/react";
import React, { useState } from "react";
import ChevronIcon from "../../assets/icons/chevron.svg";
import TaskIcon from "../../assets/icons/task-2-lines.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import { instructionsNav } from "../../constants/nav";
import styles from "./Instructions.module.scss";

const Instructions: React.FC = () => {
  const [filter, setFilter] = useState("");
  return (
    <IonPage>
      <Header
        left={["back"]}
        right={["notification", "search"]}
        title="Instructions"
      />
      <IonContent>
        <SegmentNavPanel
          items={instructionsNav}
          value={filter}
          setValue={setFilter}
        />
        <IonAccordionGroup className={styles.accordionWrapper}>
          <IonAccordion
            className={styles.accordionItem}
            value="first"
            toggleIcon={ChevronIcon}
          >
            <IonItem className={styles.intructionWrapper} slot="header">
              <div className={styles.iconWrapper}>
                <IonIcon src={TaskIcon} className={styles.intructionIcon} />
              </div>
              <div className={styles.intructionTitleWrapper}>
                <span className={styles.title}>Welcome letter</span>
                <div className={styles.updateInfoWrapper}>
                  <IonIcon
                    src={CalendarIcon}
                    className={styles.updateInfoIcon}
                  />
                  <span className={styles.updateInfoWrapper}>
                    Last update: 12.02.2024
                  </span>
                </div>
              </div>
            </IonItem>
            <div slot="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              tempore perspiciatis, tenetur iure inventore eos. Dicta esse
              voluptatem unde minus!
            </div>
          </IonAccordion>
          <IonAccordion
            className={styles.accordionItem}
            value="second"
            toggleIcon={ChevronIcon}
          >
            <IonItem className={styles.intructionWrapper} slot="header">
              <div className={styles.iconWrapper}>
                <IonIcon src={TaskIcon} className={styles.intructionIcon} />
              </div>
              <div className={styles.intructionTitleWrapper}>
                <span className={styles.title}>Welcome letter</span>
                <div className={styles.updateInfoWrapper}>
                  <IonIcon
                    src={CalendarIcon}
                    className={styles.updateInfoIcon}
                  />
                  <span className={styles.updateInfoWrapper}>
                    Last update: 12.02.2024
                  </span>
                </div>
              </div>
            </IonItem>
            <div slot="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              tempore perspiciatis, tenetur iure inventore eos. Dicta esse
              voluptatem unde minus!
            </div>
          </IonAccordion>
          <IonAccordion
            className={styles.accordionItem}
            value="third"
            toggleIcon={ChevronIcon}
          >
            <IonItem className={styles.intructionWrapper} slot="header">
              <div className={styles.iconWrapper}>
                <IonIcon src={TaskIcon} className={styles.intructionIcon} />
              </div>
              <div className={styles.intructionTitleWrapper}>
                <span className={styles.title}>Welcome letter</span>
                <div className={styles.updateInfoWrapper}>
                  <IonIcon
                    src={CalendarIcon}
                    className={styles.updateInfoIcon}
                  />
                  <span className={styles.updateInfoWrapper}>
                    Last update: 12.02.2024
                  </span>
                </div>
              </div>
            </IonItem>
            <div slot="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              tempore perspiciatis, tenetur iure inventore eos. Dicta esse
              voluptatem unde minus!
            </div>
          </IonAccordion>
          <IonAccordion
            className={styles.accordionItem}
            value="fourth"
            toggleIcon={ChevronIcon}
          >
            <IonItem className={styles.intructionWrapper} slot="header">
              <div className={styles.iconWrapper}>
                <IonIcon src={TaskIcon} className={styles.intructionIcon} />
              </div>
              <div className={styles.intructionTitleWrapper}>
                <span className={styles.title}>Welcome letter</span>
                <div className={styles.updateInfoWrapper}>
                  <IonIcon
                    src={CalendarIcon}
                    className={styles.updateInfoIcon}
                  />
                  <span className={styles.updateInfoWrapper}>
                    Last update: 12.02.2024
                  </span>
                </div>
              </div>
            </IonItem>
            <div slot="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              tempore perspiciatis, tenetur iure inventore eos. Dicta esse
              voluptatem unde minus!
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Instructions;
