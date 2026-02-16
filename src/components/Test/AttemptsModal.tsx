import { useEffect, useRef, useState } from "react";
import {
  IonAlert,
  IonContent,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { Empty } from "antd";
import { useParams } from "react-router";
import { TestAttemptType } from "../../types/user";
import {
  LessonType,
  TestDataType,
  useCourses,
} from "../../context/CoursesContext";
import { instance } from "../../http/instance";
import { useToast } from "../../hooks/useToast";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import EyeIcon from "../../assets/icons/auth/eye-open.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import TestContent from "./TestContent";
import styles from "./AttemptsModal.module.scss";

const MIN_HEIGHT = "250rem";
const MAX_HEIGHT = "calc(100% - var(--ion-safe-area-top) - 16rem - 30px)";

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
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [activeAttemptId, setActiveAttemptId] = useState<number | null>(null);
  const [present] = useToast();
  const { courseId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const getCourseDetailById = useCourses()?.getCourseDetailById;

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

  const handleToggleShowAttempt = async (attemptId: number) => {
    if (activeAttemptId === attemptId) {
      setActiveAttemptId(null);
      return;
    }

    if (
      testAttemptsData.findIndex((attempt) => attempt.id === attemptId) === -1
    ) {
      try {
        const response = await instance.get(
          `student-test/attempt/${attemptId}`
        );
        if (response.data) {
          setTestAttemptsData((prev) => [
            ...prev,
            { id: attemptId, answers: response.data },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setActiveAttemptId(attemptId);
  };

  useEffect(() => {
    const page = document.getElementById("course-page");
    if (page) setPresentingElement(page);
  }, []);

  const testData = test.lessonData as TestDataType;
  const testMaxAttempts = testData?.attempts;
  const userHasCompletedAttempts = testAttempts.length !== 0;

  console.log(isOpen);

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      presentingElement={presentingElement!}
      onDidDismiss={handleClose}
      className={styles.attemptModal}
      canDismiss={true}
      style={{
        "--height": activeAttemptId ? MAX_HEIGHT : MIN_HEIGHT,
      }}
    >
      <div className={styles.handle} />
      <div className={styles.header}>
        <span className={styles.label}>Your attempts</span>
        {testMaxAttempts && (
          <span>{`${
            testMaxAttempts - testAttempts.length
          } / ${testMaxAttempts}`}</span>
        )}
      </div>
      <IonContent className={styles.content} scrollY={false}>
        {userHasCompletedAttempts ? (
          <>
            <ul className={styles.accordion}>
              {testAttempts.map((attempt) =>
                activeAttemptId && activeAttemptId !== attempt.id ? null : (
                  <li className={styles.accordionItem} key={attempt.id}>
                    <div className={styles.attemptsHeader}>
                      <div className={styles.attemptScore}>
                        <p>Grade</p>
                        <p>
                          <span>{attempt.attempt_score}</span>
                          <span className={styles.divider}>\</span>
                          <span>{testData?.score}</span>
                        </p>
                      </div>
                      <div className={styles.attemptButtons}>
                        <button
                          className={styles.toggleShowAttempt}
                          onClick={() => handleToggleShowAttempt(attempt.id)}
                        >
                          {activeAttemptId === attempt.id ? (
                            <IonIcon src={CrossIcon} />
                          ) : (
                            <IonIcon src={EyeIcon} />
                          )}
                        </button>
                        {!testData?.my_attempt_id ||
                          (testData?.my_attempt_id === attempt.id && (
                            <>
                              <button
                                className={styles.submitButton}
                                id={`present-alert-confirm-attempt-${attempt.id}`}
                                disabled={!!testData?.my_attempt_id}
                              >
                                <span>Submit</span>
                                <IonIcon src={CheckIcon} />
                              </button>
                              <IonAlert
                                trigger={`present-alert-confirm-attempt-${attempt.id}`}
                                header="Submiting attempt"
                                message="Are you sure you want to record this attempt?"
                                buttons={[
                                  {
                                    role: "confirm",
                                    text: "Yes",
                                    handler: () =>
                                      handleSubmitAttempClick(attempt.id),
                                  },
                                  {
                                    role: "cancel",
                                    text: "Cancel",
                                  },
                                ]}
                              />
                            </>
                          ))}
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className={styles.attemptContent}>
              <TestContent
                test={test}
                studentAnswers={
                  testAttemptsData.find(
                    (attemptData) => attemptData.id === activeAttemptId
                  )?.answers
                }
              />
            </div>
          </>
        ) : (
          <Empty
            description={
              <span className={styles.emptyDesc}>
                You have no completed attempts
              </span>
            }
          />
        )}
      </IonContent>
    </IonModal>
  );
};

export default AttemptsModal;
