import React from "react";
import { useUser } from "../../context/UserContext";
import Accordion from "../Accordion/Accordion";
import styles from "./CertificateList.module.scss";
import CertificateItem from "./CertificateItem";
import { CourseCertificate } from "../../types/user";

export type CertificateItemDataType = {
  type: "course" | "category";
  name: string;
  certificateLink: string | null;
  status?: "completed" | "in_progress" | null;
  link?: string;
  courses?: CourseCertificate[];
  categoryId?: number;
  courseId?: number;
};

const STATUS_PRIORITY: Record<string, number> = {
  in_progress: 1,
  completed: 2,
  unknown: 3,
};

const CertificateList = () => {
  const certificatesData = useUser()?.user.certificates;

  if (!certificatesData || certificatesData.length === 0) {
    return (
      <p className={styles.noCoursesMessage}>
        You have no purchased courses yet.
      </p>
    );
  }

  const sortedCertificates = [...certificatesData].sort((a, b) => {
    const aHasInProgress = a.course_certificate_data.some(
      (course) => course.course_status === "in_progress",
    );
    const bHasInProgress = b.course_certificate_data.some(
      (course) => course.course_status === "in_progress",
    );
    if (aHasInProgress && !bHasInProgress) return -1;
    if (!aHasInProgress && bHasInProgress) return 1;
    return 0;
  });

  return (
    <ul className={styles.certificateList}>
      {sortedCertificates.map((certificate) => {
        const data: CertificateItemDataType = {
          type: "category",
          name: certificate.category_name,
          certificateLink: certificate.category_certificate_link,
          courses: certificate.course_certificate_data,
          categoryId: certificate.category_id,
        };

        const sortedCourses = [...certificate.course_certificate_data].sort(
          (a, b) => {
            const priorityA =
              STATUS_PRIORITY[a.course_status ?? "unknown"] ??
              STATUS_PRIORITY.unknown;
            const priorityB =
              STATUS_PRIORITY[b.course_status ?? "unknown"] ??
              STATUS_PRIORITY.unknown;

            return priorityA - priorityB;
          },
        );

        return (
          <li key={certificate.category_id}>
            <Accordion
              headerClassname={styles.certificatesAccordionHeader}
              header={<CertificateItem data={data} />}
              content={
                <ul className={styles.courseCertificatesList}>
                  {sortedCourses.map((courseCertificate) => {
                    const data: CertificateItemDataType = {
                      type: "course",
                      name: courseCertificate.course_name,
                      certificateLink:
                        courseCertificate.course_certificate_link,
                      status: courseCertificate.course_status,
                      link: `/course/${courseCertificate.course_id}`,
                      courseId: courseCertificate.course_id,
                    };

                    return (
                      <li key={courseCertificate.course_id}>
                        <CertificateItem data={data} />
                      </li>
                    );
                  })}
                </ul>
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CertificateList;
