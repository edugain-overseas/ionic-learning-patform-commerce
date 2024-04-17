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
  lessons: [];
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
    <CoursesContext.Provider value={{ courses, categories }}>
      {children}
    </CoursesContext.Provider>
  );
};
