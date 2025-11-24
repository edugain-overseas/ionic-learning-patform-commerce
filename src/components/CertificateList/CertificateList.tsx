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

const CertificateList = () => {
  const certificatesData = useUser()?.user.certificates;

  console.log(certificatesData);

  if (!certificatesData || certificatesData.length === 0) {
    return (
      <p className={styles.noCoursesMessage}>
        You have no purchased courses yet.
      </p>
    );
  }
  return (
    <ul className={styles.certificateList}>
      {certificatesData.map((certificate) => {
        const data: CertificateItemDataType = {
          type: "category",
          name: certificate.category_name,
          certificateLink: certificate.category_certificate_link,
          courses: certificate.course_certificate_data,
          categoryId: certificate.category_id,
        };

        return (
          <li key={certificate.category_id}>
            <Accordion
              headerClassname={styles.certificatesAccordionHeader}
              header={<CertificateItem data={data} />}
              content={
                <ul className={styles.courseCertificatesList}>
                  {certificate.course_certificate_data.map(
                    (courseCertificate) => {
                      const data: CertificateItemDataType = {
                        type: "course",
                        name: courseCertificate.course_name,
                        certificateLink:
                          courseCertificate.course_certificate_link,
                        status: courseCertificate.course_status,
                        link: `/courses/course/${courseCertificate.course_id}`,
                        courseId: courseCertificate.course_id,
                      };

                      return (
                        <li key={courseCertificate.course_id}>
                          <CertificateItem data={data} />
                        </li>
                      );
                    }
                  )}
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
