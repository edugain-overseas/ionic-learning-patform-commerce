import { useRef, useState } from "react";
import {
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { LessonType, useCourses } from "../../context/CoursesContext";
import { TestAttemptType } from "../../types/user";
import { instance } from "../../http/instance";
import { useToast } from "../../hooks/useToast";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import Header from "../Header/Header";
import TestContent from "./TestContent";
import styles from "./Test.module.scss";
import { useParams } from "react-router";

const AttemptsModal = ({
  test,
  testAttempts,
  isOpen = false,
  handleClose,
}: {
  test: LessonType;
  testAttempts: TestAttemptType[];
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [testAttemptsData, setTestAttemptsData] = useState<any[]>([]);
  const [present] = useToast();

  const { courseId } = useParams<{ courseId: string }>();

  const getCourseDetailById = useCourses()?.getCourseDetailById;

  const handleAccordionGroupChange = async (ev: AccordionGroupCustomEvent) => {
    const selectedValue = ev.detail.value;
    if (
      testAttemptsData.findIndex((attempt) => attempt.id === +selectedValue) ===
        -1 &&
      selectedValue
    ) {
      try {
        const response = await instance.get(
          `student-test/attempt/${selectedValue}`
        );
        if (response.data) {
          setTestAttemptsData((prev) => [
            ...prev,
            { id: +selectedValue, answers: response.data },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitAttempClick = async (attemptId: number) => {
    const attemptData = testAttempts.find(({ id }) => id === attemptId);

    if (attemptData) {
      const requestData = {
        attempt_id: attemptData.id,
        student_id: attemptData.student_id,
        lesson_id: test.id,
      };

      try {
        const response = await instance.post(
          "student-test/submit",
          requestData
        );

        await getCourseDetailById?.(courseId);

        present({
          type: "success",
          message: `${response.data.Message}!`,
          duration: 5000,
        });
        modalRef.current?.dismiss();
      } catch (error) {
        console.error(error);
        present({
          type: "error",
          message: `Something went wrong!`,
          duration: 5000,
        });
      }
    }
  };

  const modalHeaderProps = {
    title: `${test.title} attempts`,
    left: [
      {
        name: "prevLesson",
        onClick: () => modalRef.current?.dismiss(),
      },
    ],
    right: [],
    toolbarClassName: styles.modalToolbar,
  };

  return (
    <IonModal
      ref={modalRef}
      className={styles.modal}
      isOpen={isOpen}
      onDidDismiss={handleClose}
    >
      <Header {...modalHeaderProps} />
      <div className={styles.modalContent}>
        <IonAccordionGroup
          className={styles.accordion}
          onIonChange={handleAccordionGroupChange}
        >
          {testAttempts.map((attempt) => (
            <IonAccordion
              value={`${attempt.id}`}
              key={attempt.id}
              className={styles.accordionItem}
            >
              <div slot="header" className={styles.attemptsHeader}>
                <div className={styles.attemptData}>
                  <span className={styles.attemptTitle}>
                    {`Attempt № ${attempt.attempt_number}`}
                  </span>
                  <span className={styles.attemptTitle}>
                    {`Score: ${attempt.attempt_score}`}
                  </span>
                </div>
              </div>
              <div slot="content" className={styles.attemptsContent}>
                <TestContent
                  test={test}
                  studentAnswers={
                    testAttemptsData.find(
                      (attemptData) => attemptData.id === attempt.id
                    )?.answers
                  }
                />
                <button
                  className={styles.finalSubmitAttempt}
                  id={`present-alert-confirm-attempt-${attempt.id}`}
                >
                  <IonIcon src={CheckIcon} />
                  <span>Submit</span>
                </button>
                <IonAlert
                  trigger={`present-alert-confirm-attempt-${attempt.id}`}
                  header="Submiting attempt"
                  message="Are you sure you want to record this attempt?"
                  buttons={[
                    {
                      role: "confirm",
                      text: "Yes",
                      handler: () => handleSubmitAttempClick(attempt.id),
                    },
                    {
                      role: "cancel",
                      text: "Cancel",
                    },
                  ]}
                />
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
    </IonModal>
  );
};

export default AttemptsModal;
