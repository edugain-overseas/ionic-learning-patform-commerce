import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";

interface Course {
  id: string;
  name: string;
}

interface CoursesContextType {
  courses: Course[];
}

interface CoursesProviderType {
  children: React.ReactNode;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider: React.FC<CoursesProviderType> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await instance.get<Course[]>("/course/all");
        console.log(response);

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getAllCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};
