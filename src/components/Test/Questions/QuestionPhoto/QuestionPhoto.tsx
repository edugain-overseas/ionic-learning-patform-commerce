import React from "react";
// import { Image } from "antd";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import noImage from "../../../../images/noImage.jpeg";
import styles from "./QuestionPhoto.module.scss";
import InputRadio from "../../../InputRadio/InputRadio";
import { TestQuestionType } from "../../TestContent";
import { serverName } from "../../../../http/server";

const QuestionPhoto: React.FC<TestQuestionType> = ({
  answers,
  state,
  setState,
  id,
  imagePath,
}) => {
  const onRadioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setState(id, value);
  };

  console.log(answers);
  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => {
      console.log(answerText);
      return (
        <InputRadio
          key={answerId}
          value={answerId}
          onChange={onRadioInputChange}
          checked={state === answerId}
          name={answerText}
          labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
        />
      );
    });
  };
  return (
    <div className={styles.questionBody}>
      <div className={styles.imageWrapper}>
        {/* <Image
          src={`${serverName}/${imagePath}`}
          fallback={noImage}
          preview={{
            imageRender: (originalNode) => <div className={styles.previewImageWrapper}>{originalNode}</div>,
          }}
        /> */}
        <div className={styles.previewImageWrapper}>
          <img src={`${serverName}/${imagePath}`} />
        </div>
      </div>
      <form className={styles.answersWrapper}>{renderAnswers()}</form>
    </div>
  );
};

export default QuestionPhoto;
