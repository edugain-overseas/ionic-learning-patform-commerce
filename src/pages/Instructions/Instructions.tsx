import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useState } from "react";
import TaskIcon from "../../assets/icons/task-2-lines.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import { instructionsNav } from "../../constants/nav";
import styles from "./Instructions.module.scss";
import Accordion from "../../components/Accordion/Accordion";

const Instructions: React.FC = () => {
  const [filter, setFilter] = useState("general");
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
        <div className={styles.container}>
          <Accordion
            header={
              <div className={styles.header}>
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
                    <span className={styles.updateInfoText}>
                      Last update: 12.02.2024
                    </span>
                  </div>
                </div>
              </div>
            }
            content={
              <div className={styles.instructionContent}>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore, eaque maiores! Perferendis repudiandae nesciunt
                  quibusdam ipsum reiciendis similique aperiam officiis sequi
                  blanditiis voluptatem in neque cumque amet quis doloribus
                  velit, sapiente itaque libero et praesentium sint vitae porro.
                  Eius nisi quia quo vitae iure laudantium, dicta eligendi
                  ipsam, aperiam eaque veniam rem a placeat repellendus maxime
                  aliquam tempore soluta minima quidem vel sit quisquam? Ad
                  veritatis laboriosam a non, repellat, delectus modi impedit
                  architecto molestiae alias qui eaque, ullam voluptates! Minus
                  dolore soluta reprehenderit optio, deleniti voluptate, sequi
                  sint libero nulla eligendi commodi, debitis aliquam placeat
                  tempora quaerat ab sit.
                </span>
              </div>
            }
          />
          <Accordion
            header={
              <div className={styles.header}>
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
                    <span className={styles.updateInfoText}>
                      Last update: 12.02.2024
                    </span>
                  </div>
                </div>
              </div>
            }
            content={
              <div className={styles.instructionContent}>
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, quia.
                </span>
              </div>
            }
          />
          <Accordion
            header={
              <div className={styles.header}>
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
                    <span className={styles.updateInfoText}>
                      Last update: 12.02.2024
                    </span>
                  </div>
                </div>
              </div>
            }
            content={
              <div className={styles.instructionContent}>
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, quia.
                </span>
              </div>
            }
          />
          <Accordion
            header={
              <div className={styles.header}>
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
                    <span className={styles.updateInfoText}>
                      Last update: 12.02.2024
                    </span>
                  </div>
                </div>
              </div>
            }
            content={
              <div className={styles.instructionContent}>
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, quia.
                </span>
              </div>
            }
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Instructions;
