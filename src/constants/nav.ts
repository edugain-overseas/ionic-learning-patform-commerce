import homeIcon from "../assets/icons/menu/home.svg";
import couresIcon from "../assets/icons/menu/courses.svg";
import myProfileIcon from "../assets/icons/menu/my-profile.svg";
import aboutIEUIcon from "../assets/icons/menu/aboutIEU.svg";
import instructionsIcon from "../assets/icons/menu/instruction.svg";

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

export const coursesNavItems = [
  {
    value: "my",
    label: "my courses",
  },
  {
    value: "available",
    label: "available courses",
  },
  {
    value: "completed",
    label: "completed courses",
  },
];
