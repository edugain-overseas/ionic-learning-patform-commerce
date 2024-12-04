import { FC, useEffect, useRef, useState } from "react";
import styles from "./LessonToolsPanel.module.scss";
import {
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import InsetBtn from "../InsetBtn/InsetBtn";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import Header from "../Header/Header";
import { LessonType, TestDataType } from "../../context/CoursesContext";
import { instance } from "../../http/instance";
import { TestAtteptType } from "../../context/UserContext";

type TestToolsProps = {
  test: LessonType;
  currentAttempt: any[];
};

const TestTools: FC<TestToolsProps> = ({ test, currentAttempt }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [testAttempts, setTestAttempts] = useState<TestAtteptType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testAttemptsData, setTestAttemptsData] = useState<any[]>([]);

  console.log(test);

  const testData = test.lessonData as TestDataType;
  console.log(testData);

  const handleSubmitCurrentAttempt = async () => {
    try {
      setIsLoading(true);
      const response = await instance.post("student-test/send", {
        lesson_id: test.id,
        student_answers: currentAttempt,
      });
      if (response.data) {
        setTestAttempts((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        console.log(response.data);
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
    title: "Test Title",
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
          buttonClassName={styles.openModalBtn}
          backgroundColor="#39BA6D"
          buttonBackgroundColor="rgba(255, 255, 255, 0.65)"
          ripple={true}
          id="open-test-attempts-modal"
        />
      </div>
      <IonModal
        trigger="open-test-attempts-modal"
        ref={modalRef}
        className={styles.modal}
      >
        <Header {...modalHeaderProps} />
        <div className={styles.modalContent}>
          <IonButton
            expand="block"
            className={styles.submitBtn}
            onClick={handleSubmitCurrentAttempt}
          >
            Submit current attempt
          </IonButton>
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
                  <span className={styles.attemptTitle}>
                    {`Attempt № ${attempt.attempt_number}`}
                  </span>
                  <span className={styles.attemptTitle}>
                    {`Score: ${attempt.attempt_score}`}
                  </span>
                </div>
                <div slot="content" className={styles.attemptsContent}>
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
