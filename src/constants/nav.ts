import homeIcon from "../assets/icons/menu/home.svg";
import couresIcon from "../assets/icons/menu/courses.svg";
import myProfileIcon from "../assets/icons/menu/my-profile.svg";
import aboutIEUIcon from "../assets/icons/menu/aboutIEU.svg";
import instructionsIcon from "../assets/icons/menu/instruction.svg";

export type TabNameType = "home" | "courses" | "my-profile" | "basket";

export type TabType = {
  label: TabNameType;
  href: `/${TabNameType}`;
};

export const tabsData: TabType[] = [
  {
    label: "home",
    href: "/home",
  },
  {
    label: "courses",
    href: "/courses",
  },
  {
    label: "my-profile",
    href: "/my-profile",
  },
  {
    label: "basket",
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
    label: "Courses",
    to: "/courses",
    iconSrc: couresIcon,
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

export const coursesPublicNavItems = [
  {
    value: "available",
    label: "available",
  },
];

export const courseNavItems = (courseId: string) => [
  { value: `/courses/course/${courseId}`, label: "Intro" },
  { value: `/courses/course/${courseId}/tasks`, label: "Materials | Tasks" },
  { value: `/courses/course/${courseId}/exam`, label: "Exam | Certificate" },
];
