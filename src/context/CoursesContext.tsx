import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";

// Define the shape of the course object
interface Course {
  id: string;
  name: string;
}

// Define the shape of the context
interface CoursesContextType {
  courses: Course[];
}

interface CoursesProviderType {
  children: React.ReactNode;
}

// Create the context
const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

// Custom hook to use the context
export const useCourses = () => useContext(CoursesContext);

// Provider component
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
