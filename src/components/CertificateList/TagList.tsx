import Tag, { TagProps } from "../Tag/Tag";
import { CertificateItemDataType } from "./CertificateList";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import MinusIcon from "../../assets/icons/minus-in-circle.svg";
import styles from "./CertificateList.module.scss";

type CertificateColor = "blue" | "red" | "green" | "default";

const certificateTagColors: Record<
  CertificateColor,
  {
    textColor: string;
    borderColor: string;
    backgroundColor: string;
  }
> = {
  blue: {
    textColor: "#213DBD",
    borderColor: "#B2C6FB",
    backgroundColor: "#F1F5FE",
  },
  red: {
    textColor: "#D76343",
    borderColor: "#F58A6C",
    backgroundColor: "#FFF0EC",
  },
  green: {
    textColor: "#50AA17",
    borderColor: "#C2E999",
    backgroundColor: "#F8FFEF",
  },
  default: {
    textColor: "#676767",
    borderColor: "#D9D9D9",
    backgroundColor: "#FAFAFA",
  },
};

const getCourseCertificateStatusTagProps = (
  data: CertificateItemDataType
): { color: CertificateColor; text: string; icon?: string } => {
  if (data.certificateLink) {
    return { color: "green", text: "Certificate", icon: CheckIcon };
  }
  if (data.status === "in_progress") {
    return { color: "blue", text: "In Progress" };
  }
  return { color: "default", text: "No Certificate", icon: MinusIcon };
};

const getCategoryCertificateStatusTagProps = (
  data: CertificateItemDataType
): { color: CertificateColor; text: string; icon?: string } => {
  if (!data.courses) {
    return { color: "default", text: "No Certificate", icon: MinusIcon };
  }
  const purchasedCourses = data.courses.filter(
    (course) =>
      course.course_status === "completed" ||
      course.course_status === "in_progress"
  );

  const text = `Purchased ${purchasedCourses.length}/${data.courses.length} courses`;

  if (purchasedCourses.length === data.courses.length) {
    return { color: "green", text };
  } else {
    return { color: "red", text };
  }
};

const TagList = ({ data }: { data: CertificateItemDataType }) => {
  const courseCertificateStatus =
    data.type === "category"
      ? getCategoryCertificateStatusTagProps(data)
      : getCourseCertificateStatusTagProps(data);
  const courseCertificateColors =
    certificateTagColors[courseCertificateStatus.color];

  const commonTagProps: TagProps = {
    ...certificateTagColors.blue,
    text: data.type,
    className: styles.commonTag,
  };

  const certificateStatusProps: TagProps = {
    ...courseCertificateColors,
    text: courseCertificateStatus.text,
    icon: courseCertificateStatus.icon,
  };  

  return (
    <div className={styles.tagList}>
      <Tag {...commonTagProps} />
      <Tag {...certificateStatusProps} />
    </div>
  );
};

export default TagList;
