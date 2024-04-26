import React, { useEffect, useState } from "react";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import { getLessonNumberByType } from "../../utils/getLessonNumberByType";
import styles from "./Test.module.scss";
import { LessonType, TestDataType } from "../../context/CoursesContext";

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

const TestContent: React.FC<{ test: LessonType }> = ({ test }) => {
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);

  const {
    id: testId,
    course_id: courseId,
    type: lessonType,
    lessonData: testData,
    status,
  } = test;

  // const course = useSelector(getAllCourses)?.find(({ id }) => id === courseId);
  const testContent = [...(testData as TestDataType)?.questions].sort(
    (itemA, itemB) => itemA.q_number - itemB.q_number
  );
  // const courseLessons = course?.lessons;

  const setSingleAnswerState = (id: number, value: number) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.q_id === id) {
          question.a_id = value;
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMultipleAnswersState = (id: number, value: number) => {
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
  };

  const setMatchingState = (
    id: number,
    leftOptionId: number,
    value: number
  ) => {
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const testState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_ids: [] },
              ]);
            }
            const multipleChoiseState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const photoAnswersState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const photoState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, matching: [] },
              ]);
            }
            const matchingState = studentAnswers.find(
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
                      answers as {
                        left: { value: string; id: number }[];
                        right: { value: string; id: number }[];
                      }
                    ).left,
                    right: (
                      answers as {
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const booleanState = studentAnswers.find(
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

  // const handleConfirmTest = () => {
  //   setConfirmBtnState("pending");
  //   dispatch(
  //     confirmTestThunk({ lessonId: testId, studentTest: studentAnswers })
  //   ).then(() => {
  //     setConfirmBtnState("fulfilled");
  //     setStudentAnswers([]);
  //   });
  // };

  // useEffect(() => {
  //   console.log("update");
  //   setStudentAnswersLength(
  //     studentAnswers.filter((ans) => {
  //       if (
  //         ans.q_type === "test" ||
  //         ans.q_type === "boolean" ||
  //         ans.q_type === "answer_with_photo" ||
  //         ans.q_type === "question_with_photo"
  //       )
  //         return ans.a_id !== 0;
  //       if (ans.q_type === "multiple_choice") return ans.a_ids.length !== 0;
  //       if (ans.q_type === "matching") return ans.matching?.length !== 0;
  //       return false;
  //     }).length
  //   );
  //   // eslint-disable-next-line
  // }, [studentAnswers]);

  return <div className={styles.contentWrapper}>{renderTestContent()}</div>;
};

export default TestContent;
