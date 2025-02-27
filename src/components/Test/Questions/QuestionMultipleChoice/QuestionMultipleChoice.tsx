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
  const onCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return null;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => (
      <InputRadio
        key={answerId}
        value={answerId}
        onChange={onCheckboxInputChange}
        checked={(state as number[])?.includes(answerId)}
        name={answerText}
        labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
      />
    ));
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
