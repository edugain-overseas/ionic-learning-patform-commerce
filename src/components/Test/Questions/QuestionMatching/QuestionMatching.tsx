import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionMatching.module.scss";
import Select from "../../../Select/Select";

interface QuestionMatchingType {
  answers: {
    left?: { value: string; id: number }[];
    right?: { value: string; uuid: string }[];
  };
  state: { left_id: number; right_uuid: string }[];
  setState: (id: number, leftOptionId: number, value: string) => void;
  id: number;
}

const QuestionMatching: React.FC<QuestionMatchingType> = ({
  answers,
  setState,
  id,
  state,
}) => {
  const leftOptions = answers?.left || [];
  const rightOptions = answers?.right || [];

  const options = rightOptions.map(({ uuid }, index) => ({
    label: getLetterVatiantsByIndex(index) || "",
    value: `${uuid}`,
  }));
  return (
    <div className={styles.matchWrapper}>
      <div className={styles.oprionsWrapper}>
        <ul className={styles.left}>
          {leftOptions.map(({ id, value }, index) => (
            <li key={id}>
              <p>
                {`${index + 1})`} {value}
              </p>
            </li>
          ))}
        </ul>
        <ul className={styles.right}>
          {rightOptions.map(({ uuid, value }, index) => (
            <li key={uuid}>
              <p>
                {getLetterVatiantsByIndex(index)} {value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.selectOptionsWrapper}>
        <p className={styles.matchPointer}>Answer options:</p>
        <ul>
          {leftOptions.map(({ id: leftOptionId }, index) => {
            const currentValue = state?.find(
              (answer) => answer.left_id === leftOptionId
            )?.right_uuid;
            return (
              <li key={leftOptionId} className={styles.answerOption}>
                <span>{`${index + 1}) = `}</span>
                <Select
                  options={options}
                  value={currentValue ? `${currentValue}` : ""}
                  onChange={(value) => setState(id, leftOptionId, value)}
                  placeholder=""
                  borderless={true}
                  allowClear={false}
                  wrapperStyles={{
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingInline: "4rem",
                    gap: "0rem",
                    fontSize: "12rem",
                    maxWidth: 'max-content',
                  }}
                  dropDownWrapperStyles={{
                    boxShadow: 'var(--custom-box-shadow-primary)'
                  }}
                  dropDownOpenDirection="up"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionMatching;
