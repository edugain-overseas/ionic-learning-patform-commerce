import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useState } from "react";
import TaskIcon from "../../assets/icons/task-2-lines.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import { instructionsNav } from "../../constants/nav";
import styles from "./Instructions.module.scss";
import Accordion from "../../components/Accordion/Accordion";
import { useCourses } from "../../context/CoursesContext";
import { getFormattedStrFromDate } from "../../utils/formatDate";
import InstructionContent from "./InstructionContent";

const Instructions: React.FC = () => {
  const instructions = useCourses()?.instructions;
  const [filter, setFilter] = useState<"general" | "courses">("general");

  const headerProps = {
    title: "Instructions",
    left: [{ name: "back" }],
    right: [
      { name: "notification", onClick: () => {} },
      { name: "search", onClick: () => {} },
    ],
  };

  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent>
        <SegmentNavPanel
          items={instructionsNav}
          value={filter}
          setValue={setFilter}
        />
        <div className={styles.container}>
          {instructions &&
            instructions[filter].map((instruction) => (
              <Accordion
                key={instruction.id}
                header={
                  <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                      <IonIcon
                        src={TaskIcon}
                        className={styles.intructionIcon}
                      />
                    </div>
                    <div className={styles.intructionTitleWrapper}>
                      <span className={styles.title}>{instruction.name}</span>
                      <div className={styles.updateInfoWrapper}>
                        <IonIcon
                          src={CalendarIcon}
                          className={styles.updateInfoIcon}
                        />
                        <span className={styles.updateInfoText}>
                          {`Last update: ${getFormattedStrFromDate(
                            instruction.last_update
                          )}`}
                        </span>
                      </div>
                    </div>
                  </div>
                }
                content={<InstructionContent instruction={instruction} />}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Instructions;
