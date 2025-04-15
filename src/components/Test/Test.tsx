import React, { useEffect, useState } from "react";
import {
  LessonType,
  TestDataType,
  useCourses,
} from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import TestContent from "./TestContent";
import DoubleScrollLayout from "../DoubleScrollLayout/DoubleScrollLayout";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Test.module.scss";
import LessonToolsPanel from "../LessonToolsPanel/LessonToolsPanel";
import TestTools from "../LessonToolsPanel/TestTools";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import TaskFooterNavBtn from "../TaskFooterNavBtn/TaskFooterNavBtn";
import TestLanding from "./TestLanding";
import CommonButton from "../CommonButton/CommonButton";
import PrimaryScrollConteinerLayout from "../PrimaryScrollConteinerLayout/PrimaryScrollConteinerLayout";

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);

  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );

  const answersProgressValue = Math.round(
    (studentAnswers.filter((ans) => {
      if (
        ans.q_type === "test" ||
        ans.q_type === "boolean" ||
        ans.q_type === "answer_with_photo" ||
        ans.q_type === "question_with_photo"
      )
        return ans.a_id !== 0;
      if (ans.q_type === "multiple_choice") return ans.a_ids.length !== 0;
      if (ans.q_type === "matching") return ans.matching?.length !== 0;
      return false;
    }).length /
      (taskData.lessonData as TestDataType)?.questions.length) *
      100
  );

  const number =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "test")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

  return isTestOpen ? (
    <>
      {!Number.isNaN(answersProgressValue) && (
        <div className={styles.answersProgress}>
          <span
            className={styles.answersProgressValue}
          >{`Progress: ${answersProgressValue} / 100%`}</span>
          <ProgressBar
            value={answersProgressValue}
            width={230}
            height={10}
            showValue={false}
          />
        </div>
      )}
      <LessonToolsPanel>
        <TestTools test={taskData} currentAttempt={studentAnswers} />
      </LessonToolsPanel>

      <PrimaryScrollConteinerLayout
        posterSrc={`${serverName}/${taskData.image_path}`}
        topLabel="Test"
        endPosition={170}
      >
        <div>
          <div className={styles.testHeader}>
            <div className={styles.title}>
              {`${course?.title}: `}
              <span className={styles.titleValue}>{taskData.title}</span>
            </div>
            <div className={styles.title}>
              {"Test №: "}
              <span className={styles.titleValue}>{number}</span>
            </div>
          </div>
          {taskData?.lessonData && "test_id" in taskData.lessonData && (
            <TestContent
              test={taskData}
              studentAnswers={studentAnswers}
              setStudentAnswers={setStudentAnswers}
            />
          )}
          <div className={styles.testFooter}>
            <EqualSpaceContainer
              containerClassname={styles.btnContainer}
              leftItem={<TaskFooterNavBtn direction="return" />}
              rightItem={<TaskFooterNavBtn direction="next" />}
            />
          </div>
        </div>
      </PrimaryScrollConteinerLayout>
    </>
  ) : (
    <>
      <TestLanding />
      <CommonButton
        label="Start"
        block={true}
        width={200}
        height={32}
        backgroundColor="var(--ion-color-dark)"
        color="var(--ion-color-primary-contrast)"
        borderRadius={5}
        className={styles.landingBtn}
        onClick={() => setIsTestOpen(true)}
      />
    </>
  );
};

export default Test;
