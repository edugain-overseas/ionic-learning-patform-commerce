export const getLessonNumberByType = (
  courseLessons: any[],
  lessonType: string,
  lessonId: number
) => {
  const sortedCourseLessons = [
    ...courseLessons.filter(({ type }) => type === lessonType),
  ].sort((a, b) => a.number - b.number);
  return sortedCourseLessons.findIndex(({ id }) => id === lessonId) + 1;
};
