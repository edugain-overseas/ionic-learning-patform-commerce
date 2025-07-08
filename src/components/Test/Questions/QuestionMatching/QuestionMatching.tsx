import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionMatching.module.scss";
import Select from "../../../Select/Select";

interface QuestionMatchingType {
  answers: {
    left?: { value: string; id: number }[];
    right?: { value: string; id: number }[];
  };
  state: { left_id: number; right_id: number }[];
  setState: (id: number, value: number, leftOptionId: number) => void;
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

  const options = rightOptions.map(({ id }, index) => ({
    label: getLetterVatiantsByIndex(index) || "",
    value: `${id}`,
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
          {rightOptions.map(({ id, value }, index) => (
            <li key={id}>
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
            )?.right_id;
            return (
              <li key={leftOptionId} className={styles.answerOption}>
                <span>{`${index + 1}) = `}</span>
                <Select
                  options={options}
                  value={currentValue ? `${currentValue}` : ""}
                  onChange={(value) => setState(id, leftOptionId, +value)}
                  placeholder=""
                  borderless={true}
                  allowClear={false}
                  wrapperStyles={{
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingInline: "4rem",
                    gap: "4rem",
                    fontSize: "12rem",
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
