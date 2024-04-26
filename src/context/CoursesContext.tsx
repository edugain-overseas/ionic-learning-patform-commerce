import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";

interface IconType {
  course_id: number;
  icon_number: number;
  id: number;
  icon_path: string;
  icon_text: string;
  icon_title: string;
}

export interface LectureContentType {
  a_id: number;
  a_type: "text" | "present" | "audio" | "video" | "file" | "link" | "picture";
  a_title: string;
  a_number: 1;
  a_text: string;
  hiden: false;
  downloadAllowed?: boolean;
  files?: {
    file_name: string;
    file_size: number;
    file_path: string;
    file_id: number;
  }[];
  links?: {
    link_id: number;
    link: string;
    anchor: string;
  }[];
}

export interface TestContentType {
  q_id: number;
  q_text: string;
  q_number: number;
  q_score: number;
  q_type:
    | "test"
    | "multiple_choice"
    | "answer_with_photo"
    | "question_with_photo"
    | "matching"
    | "boolean";
  hidden: boolean;
  image_path: null | string;
  count_correct?: number;
  answers:
    | {
        a_id: number;
        a_text: string;
        is_correct: boolean;
        image_path?: string;
      }[]
    | {
        left?: { value: string; id: number }[];
        right?: { value: string; id: number }[];
      };
}

export interface LectureDataType {
  lecture_id?: number;
  lecture_speeches?: string[];
  attributes: LectureContentType[];
}

export interface TestDataType {
  test_id?: number;
  score?: number;
  attempts?: number;
  questions: TestContentType[];
}

// type LessonDataByType = LessonType extends { type: "lecture" }
//   ? LectureDataType
//   : TestDataType;

export type LessonDataUnionType = LectureDataType | TestDataType;

export interface LessonType {
  course_id: number;
  description: string;
  id: number;
  image_path: string;
  is_published: boolean;
  number: number;
  scheduled_time: number;
  title: string;
  type: "test" | "lecture" | "exam";
  status?: string;
  count_questions?: number;
  lessonData?: LessonDataUnionType;
}

export interface CourseType {
  id: number;
  title: string;
  about_text?: string;
  c_access?: string;
  c_award?: string;
  c_duration?: string;
  c_language?: string;
  c_level?: string;
  c_type?: string;
  category_id: number;
  icons?: IconType[];
  image_path: string;
  intro_text?: string;
  is_published: boolean;
  lessons: LessonType[];
  old_price?: number;
  price: number;
  quantity_lecture: number;
  quantity_test: number;
  skills_text?: string;
}

export interface CategoryType {
  id: number;
  title: string;
  description?: string;
  image_path: string;
  discount?: number;
}

interface CoursesContextType {
  courses: CourseType[];
  categories: CategoryType[];
  getCourseDetailById: (courseId: string | number) => Promise<void>;
  getLessonById: (
    lessonId: string | number,
    courseId: number | string
  ) => Promise<void>;
}

interface CoursesProviderType {
  children: React.ReactNode;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider: React.FC<CoursesProviderType> = ({
  children,
}) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCourseDetailById = async (courseId: number | string) => {
    try {
      const data = (await instance.get(`/course/get/${courseId}`)).data;
      setCourses((prev) => [
        ...prev.filter((course) => course.id !== data.id),
        { ...data },
      ]);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getLessonById = async (
    lessonId: number | string,
    courseId: number | string
  ) => {
    try {
      const data = (await instance.get(`/lesson/get/${lessonId}`)).data;
      setCourses((prev: CourseType[]) => {
        const otherCourses = prev.filter((course) => course.id !== +courseId);
        const targetCourse = prev.find((course) => course.id === +courseId);
        if (targetCourse) {
          const updatedLessons = targetCourse.lessons.map((lesson) => {
            if (lesson.id === +lessonId) {
              return {
                ...lesson,
                lessonData:
                  data.type === "test" ? data.test_data : data.lecture_info,
              };
            }
            return lesson;
          });
          const updatedTargetCourse = {
            ...targetCourse,
            lessons: updatedLessons,
          };
          return [...otherCourses, updatedTargetCourse];
        }
        return prev;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await instance.get<CourseType[]>("/course/all");
        console.log("courses", response.data);

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const getAllCategories = async () => {
      try {
        const response = await instance.get<CategoryType[]>("/category/all");
        console.log("categories", response.data);

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getAllCategories();
    getAllCourses();
  }, []);

  return (
    <CoursesContext.Provider
      value={{ courses, categories, getCourseDetailById, getLessonById }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
