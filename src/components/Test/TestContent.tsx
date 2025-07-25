import { LessonType, TestDataType } from "../../context/CoursesContext";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import styles from "./Test.module.scss";

export interface TestQuestionType {
  answers: {
    a_id: number;
    a_text: string;
    is_correct: boolean;
    image_path?: string;
  }[];
  state: number | number[];
  setState: (id: number, value: number) => void;
  id: number;
  imagePath?: string | null;
}

const TestContent: React.FC<{
  test: LessonType;
  studentAnswers?: any[];
  setStudentAnswers?: Dispatch<SetStateAction<any[]>>;
}> = ({ test, studentAnswers, setStudentAnswers }) => {
  if (!studentAnswers && !setStudentAnswers) {
    return <></>;
  }

  const { lessonData: testData } = test;

  const testContent = [...(testData as TestDataType)?.questions].sort(
    (itemA, itemB) => itemA.q_number - itemB.q_number
  );

  console.log(studentAnswers);

  const setSingleAnswerState = (id: number, value: number) => {
    if (setStudentAnswers) {
      setStudentAnswers((prev) => {
        const updatedState = prev.map((question) => {
          if (question.q_id === id) {
            question.a_id = value;
          }
          return question;
        });
        return updatedState;
      });
    }
  };

  const setMultipleAnswersState = (id: number, value: number) => {
    if (setStudentAnswers) {
      setStudentAnswers((prev) => {
        const updatedState = prev.map((question) => {
          if (question.q_id === id) {
            if (question.a_ids.includes(value)) {
              return {
                ...question,
                a_ids: question.a_ids.filter((v: number) => v !== value),
              };
            }
            return {
              ...question,
              a_ids: [...question.a_ids, value],
            };
          }
          return question;
        });
        return updatedState;
      });
    }
  };

  const setMatchingState = (
    id: number,
    leftOptionId: number,
    value: number
  ) => {
    if (setStudentAnswers) {
      setStudentAnswers((prev) => {
        const updatedState = prev.map((question) => {
          if (question.q_id === id) {
            if (
              question.matching.find(
                ({ left_id: leftId }: { left_id: number }) =>
                  leftId === leftOptionId
              )
            ) {
              question.matching.map(
                (i: { left_id: number; right_id: number }) => {
                  if (i.left_id === leftOptionId) {
                    i.right_id = value;
                  }
                  return i;
                }
              );
            } else {
              question.matching.push({
                left_id: leftOptionId,
                right_id: value,
              });
            }
          }
          return question;
        });
        return updatedState;
      });
    }
  };

  const renderTestContent = () =>
    [...testContent]
      .sort((a, b) => a.q_number - b.q_number)
      .map((question) => {
        const {
          q_id: id,
          q_number: number,
          q_score: score,
          q_text: text,
          q_type: type,
          answers,
          image_path: imagePath,
        } = question;

        switch (type) {
          case "test":
            const testState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                </div>
                <QuestionTest
                  answers={
                    answers as {
                      a_id: number;
                      a_text: string;
                      is_correct: boolean;
                      image_path?: string;
                    }[]
                  }
                  setState={setSingleAnswerState}
                  state={testState}
                  id={id}
                />
                <span className={styles.score}>{`Grade: ${score}/${
                  (testData as TestDataType).score
                }`}</span>
              </div>
            );
          case "multiple_choice":
            const multipleChoiseState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_ids;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/${
                    (testData as TestDataType).score
                  }`}</span>
                </div>
                <QuestionMultipleChoice
                  answers={
                    answers as {
                      a_id: number;
                      a_text: string;
                      is_correct: boolean;
                      image_path?: string;
                    }[]
                  }
                  state={multipleChoiseState as number[]}
                  setState={setMultipleAnswersState}
                  id={id}
                />
              </div>
            );
          case "answer_with_photo":
            const photoAnswersState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/${
                    (testData as TestDataType).score
                  }`}</span>
                </div>
                <QuestionPhotoAnswers
                  answers={
                    answers as {
                      a_id: number;
                      a_text: string;
                      is_correct: boolean;
                      image_path?: string;
                    }[]
                  }
                  state={photoAnswersState}
                  setState={setSingleAnswerState}
                  id={id}
                />
              </div>
            );
          case "question_with_photo":
            const photoState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/${
                    (testData as TestDataType).score
                  }`}</span>
                </div>
                <QuestionPhoto
                  answers={
                    answers as {
                      a_id: number;
                      a_text: string;
                      is_correct: boolean;
                      image_path?: string;
                    }[]
                  }
                  state={photoState}
                  setState={setSingleAnswerState}
                  id={id}
                  imagePath={imagePath}
                />
              </div>
            );
          case "matching":
            const matchingState = studentAnswers?.find(
              ({ q_id }) => q_id === id
            )?.matching;

            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span> {text}
                  </p>
                  <span className={styles.score}>{`${score}/${
                    (testData as TestDataType).score
                  }`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    left: (
                      answers[0] as {
                        left: { value: string; id: number }[];
                        right: { value: string; id: number }[];
                      }
                    ).left,
                    right: (
                      answers[0] as {
                        left: { value: string; id: number }[];
                        right: { value: string; id: number }[];
                      }
                    ).right,
                  }}
                  state={matchingState}
                  setState={setMatchingState}
                  id={id}
                />
              </div>
            );
          case "boolean":
            const booleanState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/${
                    (testData as TestDataType).score
                  }`}</span>
                </div>
                <QuestionTest
                  answers={
                    answers as {
                      a_id: number;
                      a_text: string;
                      is_correct: boolean;
                      image_path?: string;
                    }[]
                  }
                  state={booleanState}
                  setState={setSingleAnswerState}
                  id={id}
                />
              </div>
            );
          default:
            return null;
        }
      });

  useEffect(() => {
    if (
      testData &&
      testContent &&
      setStudentAnswers &&
      studentAnswers?.length === 0
    ) {
      console.log('initial test content');
      
      setStudentAnswers((prev) => {
        const updatedAnswers = [...prev];
        testContent.forEach((question) => {
          if (!prev.find(({ q_id }) => q_id === question.q_id)) {
            updatedAnswers.push({
              q_id: question.q_id,
              q_type: question.q_type,
              ...(question.q_type === "multiple_choice"
                ? { a_ids: [] }
                : question.q_type === "matching"
                ? { matching: [] }
                : { a_id: 0 }),
            });
          }
        });
        return updatedAnswers;
      });
    }
  }, [testData, setStudentAnswers]);

  return (
    <div
      className={styles.contentWrapper}
      style={{ opacity: setStudentAnswers ? "1" : "0.5" }}
    >
      {studentAnswers && renderTestContent()}
    </div>
  );
};

export default TestContent;
