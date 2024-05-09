import React, { useState } from "react";
import styles from "./Lecture.module.scss";
import { LectureContentType } from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import PDFReader from "../PDFReader/PDFReader";
import VideoPlayer from "../VideoPlayer/VideoPlayer/VideoPlayer";
import DocumentLink from "../DocumentLink/DocumentLink";
import LinkCard from "../LinkCard/LinkCard";

const LectureContent: React.FC<{ lectureContent: LectureContentType[] }> = ({
  lectureContent,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const renderLectureContent = () =>
    lectureContent?.map((section) => {
      const {
        a_type: type,
        a_id: id,
        a_title: title,
        a_text: text,
        downloadAllowed,
        // fileName,
        // fileSize,
        hiden,
        files,
        links,
      } = section;
      switch (type) {
        case "text":
          return (
            <section
              key={id}
              id={type}
              className={hiden ? `${styles.section} hidden` : styles.section}
            >
              {title && (
                <h3
                  className={styles.sectionTitle}
                  dangerouslySetInnerHTML={{ __html: title }}
                ></h3>
              )}
              {text && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "present":
          const filePath = files && files[0]?.file_path;
          const encodedFilePathPresent = filePath?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hiden ? "hidden" : `${styles.section} ${styles.sectionPDF}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <div className={styles.pdfWrapper}>
                <PDFReader
                  pdf={`${serverName}/${encodedFilePathPresent}`}
                  setFullscreen={setFullscreen}
                  fullscreen={false}
                />
              </div>
              {/* <Modal
                width="fit-content"
                contentWrapperStyles={{
                  padding: 0,
                  background: "none",
                  boxShadow: "none",
                }}
                isOpen={fullscreen}
                closeModal={() => setFullscreen(false)}
              >
                <PDFReader
                  pdf={`${serverName}/${encodedFilePathPresent}`}
                  setFullscreen={setFullscreen}
                  fullscreen={fullscreen}
                />
              </Modal> */}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "audio":
          const encodedFilePathAudio = filePath?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hiden ? "hidden" : `${styles.section} ${styles.sectionAudio}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <audio
                src={`${serverName}${encodedFilePathAudio}`}
                controls={true}
                // width="true"
                // height="auto"
                controlsList={downloadAllowed ? "" : "nodownload"}
              ></audio>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "video":
          const encodedFilePathVideo =
            files && files[0].file_path?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hiden ? "hidden" : `${styles.section} ${styles.sectionVideo}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <div className={styles.videoWrapper}>
                <VideoPlayer
                  file={{ filePath: `${serverName}/${encodedFilePathVideo}` }}
                />
              </div>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "file":
          return (
            <section
              key={id}
              id={type}
              className={
                hiden ? "hidden" : `${styles.section} ${styles.sectionFiles}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              {files && files.length !== 0 && (
                <div className={styles.filesWrapper}>
                  {files.map((file) => (
                    <DocumentLink file={file} key={file.file_id} />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "link":
          return (
            <section
              key={id}
              id={type}
              className={
                hiden ? "hidden" : `${styles.section} ${styles.sectionFiles}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              {links && links.length !== 0 && (
                <div className={styles.linksWrapper}>
                  {links.map(({ link_id, link, anchor }) => (
                    <LinkCard
                      key={link_id}
                      link={link}
                      text={anchor}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        // case "picture":
        //   return (
        //     <section
        //       key={id}
        //       id={type}
        //       className={hiden ? "hidden" : styles.section}
        //     >
        //       <h3
        //         className={styles.sectionTitle}
        //         dangerouslySetInnerHTML={{ __html: title }}
        //       ></h3>
        //       <ImageGroup imagesData={files} styles={styles} isDesc={true} />
        //       {text && (
        //         <div
        //           className={styles.sectionContentWrapper}
        //           dangerouslySetInnerHTML={{ __html: text }}
        //         ></div>
        //       )}
        //     </section>
        //   );
        default:
          return null;
      }
    });
  return <div className={styles.contentWrapper}>{renderLectureContent()}</div>;
};

export default LectureContent;