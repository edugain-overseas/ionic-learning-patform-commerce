import React from "react";
import { useParams } from "react-router";
import { courseNavItems } from "../../constants/nav";
import SegmentNavPanel from "../SegmentNavPanel/SegmentNavPanel";

const CourseNavPanel: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return <SegmentNavPanel items={courseNavItems(courseId)} routerNav={true} />;
};

export default CourseNavPanel;
