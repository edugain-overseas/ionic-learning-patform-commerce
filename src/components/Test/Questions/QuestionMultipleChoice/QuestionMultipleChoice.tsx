import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import { TestQuestionType } from "../../TestContent";
import InputRadio from "../../../InputRadio/InputRadio";
import styles from "./QuestionMultipleChoice.module.scss";

const QuestionMultipleChoice: React.FC<TestQuestionType> = ({
  answers,
  state,
  setState,
  id,
}) => {
  const onCheckboxInputChange = (answerId: number) => {
    setState(id, answerId);
  };

  const renderAnswers = () => {
    if (!answers) {
      return null;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => (
      <InputRadio
        key={answerId}
        onChange={() => onCheckboxInputChange(answerId)}
        checked={(state as number[])?.includes(answerId)}
        type="checkbox"
        name={answerText}
        labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
      />
    ));
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
