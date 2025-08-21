import { FC, useEffect, useRef, useState } from "react";
import styles from "./LessonToolsPanel.module.scss";
import {
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonModal,
  useIonToast,
} from "@ionic/react";
import InsetBtn from "../InsetBtn/InsetBtn";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import Header from "../Header/Header";
import {
  LessonType,
  TestDataType,
  useCourses,
} from "../../context/CoursesContext";
import { instance } from "../../http/instance";
import TestContent from "../Test/TestContent";
import { TestAttemptType } from "../../types/user";

type TestToolsProps = {
  test: LessonType;
  currentAttempt: any[];
};

const TestTools: FC<TestToolsProps> = ({ test, currentAttempt }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [testAttempts, setTestAttempts] = useState<TestAttemptType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testAttemptsData, setTestAttemptsData] = useState<any[]>([]);
  const [present] = useIonToast();

  const testData = test.lessonData as TestDataType;

  const handleSubmitCurrentAttempt = async () => {
    try {
      setIsLoading(true);
      const response = await instance.post("student-test/send", {
        lesson_id: test.id,
        student_answers: currentAttempt,
      });
      if (response.data) {
        setTestAttempts((prev) => [response.data, ...prev]);

        present({
          message: response.data.message,
          duration: 3000,
          position: "top",
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 409) {
        present({
          message: `${error.response.data.detail}!`,
          duration: 5000,
          position: "top",
        });
      }
    } finally {
      setIsLoading(false);
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
        setIsLoading(true);
        const response = await instance.post(
          "student-test/submit",
          requestData
        );

        present({
          message: `${response.data.Message}!`,
          duration: 5000,
          position: "top",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAccordionGroupChange = async (ev: AccordionGroupCustomEvent) => {
    const selectedValue = ev.detail.value;
    if (
      testAttemptsData.findIndex((attempt) => attempt.id === +selectedValue) ===
        -1 &&
      selectedValue
    ) {
      try {
        setIsLoading(true);
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

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(
          `/student-test/attempts?test_id=${testData.test_id}`
        );
        if (response.data !== null) {
          setTestAttempts(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (testData?.test_id) {
      fetchAttempts();
    }
  }, [testData?.test_id]);

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
    <>
      <div className={styles.toolsContainer}>
        <InsetBtn
          icon={<IonIcon src={CheckIcon} />}
          width="32rem"
          height="32rem"
          fontSize="14rem"
          buttonClassName={styles.submitAttemptBtn}
          backgroundColor="#39BA6D"
          buttonBackgroundColor="rgba(255, 255, 255, 0.65)"
          ripple={true}
          onClick={handleSubmitCurrentAttempt}
          disabled={test.status === "completed"}
        />
        <button
          id="open-test-attempts-modal"
          className={styles.openAttemptsModalBtn}
        >
          <span>Open Attempts</span>
        </button>
      </div>

      <IonModal
        trigger="open-test-attempts-modal"
        ref={modalRef}
        className={styles.modal}
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
                    onClick={() => handleSubmitAttempClick(attempt.id)}
                  >
                    <IonIcon src={CheckIcon} />
                    <span>Submit</span>
                  </button>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </div>
      </IonModal>
    </>
  );
};

export default TestTools;
