export const letterGrade = (grade: number) => {
  if (195 <= grade) {
    return "A+";
  }
  if (190 <= grade) {
    return "A";
  }
  if (180 <= grade) {
    return "A-";
  }
  if (170 <= grade) {
    return "B+";
  }
  if (160 <= grade) {
    return "B";
  }
  if (150 <= grade) {
    return "B-";
  }
  if (140 <= grade) {
    return "C+";
  }
  if (130 <= grade) {
    return "C";
  }
  if (120 <= grade) {
    return "C-";
  }
  if (110 <= grade) {
    return "D+";
  }
  if (100 <= grade) {
    return "D";
  }
  if (90 <= grade) {
    return "D-";
  }
  if (80 <= grade) {
    return "E";
  }
  if (0 < grade) {
    return "F";
  }
  return null;
};
