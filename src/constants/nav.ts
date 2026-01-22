import homeIcon from "../assets/icons/nav/home.svg";
import couresIcon from "../assets/icons/nav/courses.svg";
import myStudyIcon from "../assets/icons/nav/my-education.svg";
import myProfileIcon from "../assets/icons/nav/my-profile.svg";
import aboutIEUIcon from "../assets/icons/nav/aboutIEU.svg";
import instructionsIcon from "../assets/icons/nav/instruction.svg";

export type TabNameType = "Home" | "All Courses" | "My Study" | "Basket";
export type TabHrefType = "/home" | "/courses" | "/my-education" | "/basket";

export type TabType = {
  label: TabNameType;
  href: TabHrefType;
};

type CoursesFilterNameType = "all" | "short courses" | "long courses";

export const tabsData: TabType[] = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "All Courses",
    href: "/courses",
  },
  {
    label: "My Study",
    href: "/my-education",
  },
  {
    label: "Basket",
    href: "/basket",
  },
];

export const menuNav = [
  {
    label: "Home",
    to: "/home",
    iconSrc: homeIcon,
  },
  {
    label: "All Courses",
    to: "/courses",
    iconSrc: couresIcon,
  },
  {
    label: "My Study",
    to: "/my-education",
    iconSrc: myStudyIcon,
  },
  {
    label: "My profile",
    to: "/my-profile",
    iconSrc: myProfileIcon,
  },
  {
    label: "About IEU",
    to: "/aboutIEU",
    iconSrc: aboutIEUIcon,
  },
  {
    label: "Instructions",
    to: "/instructions",
    iconSrc: instructionsIcon,
  },
];

export const instructionsNav = [
  {
    label: "General instructions",
    value: "general",
  },
  {
    label: "Courses instructions",
    value: "courses",
  },
];

export const coursesPrivateNavItems = [
  {
    value: "my",
    label: "purchased",
  },
  {
    value: "available",
    label: "available",
  },
  {
    value: "completed",
    label: "completed",
  },
];

export const coursesFilter: {
  value: CoursesFilterNameType;
  label: CoursesFilterNameType;
}[] = [
  { value: "all", label: "all" },
  { value: "short courses", label: "short courses" },
  { value: "long courses", label: "long courses" },
];

export const courseNavItems = (courseId: string) => [
  { value: `/courses/course/${courseId}`, label: "Intro" },
  { value: `/courses/course/${courseId}/tasks`, label: "Materials | Tasks" },
  { value: `/courses/course/${courseId}/exam`, label: "Exam | Certificate" },
];
