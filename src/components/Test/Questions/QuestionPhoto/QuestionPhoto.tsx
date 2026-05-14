import React from "react";
import { Image } from "antd";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import { TestQuestionType } from "../../TestContent";
import { serverName } from "../../../../http/server";
// import noImage from "../../../../images/noImage.jpeg";
import InputRadio from "../../../InputRadio/InputRadio";
import styles from "./QuestionPhoto.module.scss";

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

  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => {
      return (
        <InputRadio
          key={answerId}
          value={answerId}
          onChange={onRadioInputChange}
          checked={state === answerId}
          name={answerText}
          labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
          className={styles.label}
        />
      );
    });
  };
  return (
    <div className={styles.questionBody}>
      <div className={styles.imageWrapper}>
        <Image
          src={`${serverName}/${imagePath}`}
          // fallback={noImage}
          preview={{
            imageRender: (originalNode) => (
              <div className={styles.previewImageWrapper}>{originalNode}</div>
            ),
            styles: {
              mask: {
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(28rem)",
              },
            },
          }}
        />
      </div>
      <form className={styles.answersWrapper}>{renderAnswers()}</form>
    </div>
  );
};

export default QuestionPhoto;
