export const letterGrade = (grade: number) => {
  if (190 <= grade) {
    return "A";
  }
  if (180 <= grade) {
    return "B";
  }
  if (170 <= grade) {
    return "C";
  }
  if (165 <= grade) {
    return "D";
  }
  if (160 <= grade) {
    return "E";
  }
  if (160 > grade) {
    return "F";
  }
  return null;
};
