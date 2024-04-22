import React from "react";
import { useParams } from "react-router";
import { courseNavItems } from "../../constants/nav";
import SegmentNavPanel from "../SegmentNavPanel/SegmentNavPanel";
import styles from "./CourseNavPanel.module.scss";

const CourseNavPanel: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className={styles.wrapper}>
      <SegmentNavPanel items={courseNavItems(courseId)} routerNav={true} />
    </div>
  );
};

export default CourseNavPanel;
