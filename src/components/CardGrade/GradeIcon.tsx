import { IonIcon } from "@ionic/react";
import APlus from "../../assets/icons/letterGrade/a-plus.svg";
import A from "../../assets/icons/letterGrade/a.svg";
import AMinus from "../../assets/icons/letterGrade/a-minus.svg";
import BPlus from "../../assets/icons/letterGrade/b-plus.svg";
import B from "../../assets/icons/letterGrade/b.svg";
import BMinus from "../../assets/icons/letterGrade/b-minus.svg";
import CPlus from "../../assets/icons/letterGrade/c-plus.svg";
import C from "../../assets/icons/letterGrade/c.svg";
import CMinus from "../../assets/icons/letterGrade/c-minus.svg";
import DPlus from "../../assets/icons/letterGrade/d-plus.svg";
import D from "../../assets/icons/letterGrade/d.svg";
import DMinus from "../../assets/icons/letterGrade/d-minus.svg";
import E from "../../assets/icons/letterGrade/f.svg";
import F from "../../assets/icons/letterGrade/f.svg";

const letterIconsSrc = {
  "A+": APlus,
  A: A,
  "A-": AMinus,
  "B+": BPlus,
  B: B,
  "B-": BMinus,
  "C+": CPlus,
  C: C,
  "C-": CMinus,
  "D+": DPlus,
  D: D,
  "D-": DMinus,
  E: E,
  F: F,
};

const GradeIcon = ({
  letterGrade,
  classname = "",
}: {
  letterGrade: keyof typeof letterIconsSrc;
  classname?: string;
}) => {
  return <IonIcon src={letterIconsSrc[letterGrade]} className={classname} />;
};

export default GradeIcon;
