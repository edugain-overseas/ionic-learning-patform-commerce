import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ArrowLeftIcon from "../../assets/icons/header/back.svg";
// import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
// import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
// import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
// import { ReactComponent as PrevIcon } from "../../images/icons/prev.svg";
// import { ReactComponent as NextIcon } from "../../images/icons/next.svg";
import styles from "./PDFReader.module.scss";
import { IonIcon } from "@ionic/react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  withCredentials: true,
};

interface PDFReaderType {
  pdf: string;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  fullscreen?: boolean;
}

const PDFReader: React.FC<PDFReaderType> = ({
  pdf,
  setFullscreen,
  fullscreen,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
  const [play, setPlay] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);

  // eslint-disable-next-line
  const [fileObj, setFileObj] = useState({ url: pdf });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);
  // const interval = useRef(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  const PrevBtnRef = useRef<HTMLButtonElement>(null);
  const NextBtnRef = useRef<HTMLButtonElement>(null);

  const rootFontSize = parseFloat(document.documentElement.style.fontSize);
  // const pageWidthInRem = 423;
  // const pageWidthInPx = pageWidthInRem * rootFontSize;
  const fullscreenHeight = window.window.outerHeight * 0.85;

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageLoadSuccess = (info: { height: number }) => {
    setPageLoadedSucces(true);
    setPageHeight(info.height);
  };

  const handlePrev = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleContainerMouseEnter = () => {
    if (controlPanelRef.current) {
      controlPanelRef.current.classList.add(styles.active);
    }
    if (PrevBtnRef.current) {
      PrevBtnRef.current?.classList.add(styles.active);
    }
    if (NextBtnRef.current) {
      NextBtnRef.current.classList.add(styles.active);
    }
  };

  // useEffect(() => {
  //   if (play) {
  //     interval.current = setInterval(() => {
  //       setPageNumber((prev) => prev + 2);
  //     }, 5000);
  //   } else {
  //     clearInterval(interval.current);
  //   }
  // }, [play]);

  // useEffect(() => {
  //   if (numPages && pageNumber >= numPages) {
  //     setPageNumber(1);
  //   }
  // }, [pageNumber, numPages]);

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      onMouseEnter={handleContainerMouseEnter}
      style={{ minHeight: pageLoadedSucces ? pageHeight : "auto" }}
    >
      {pageLoadedSucces && (
        <>
          <div className={styles.controlPanel} ref={controlPanelRef}>
            <div className={styles.controlsLeft}>
              <button
                className={styles.controlPlayBtn}
                onClick={() => setPlay((prev) => !prev)}
              >
                {/* {play ? <PauseIcon /> : <PlayIcon />} */}
              </button>
              <button onClick={handlePrev} className={styles.controlPrevBtn}>
                <IonIcon src={ArrowLeftIcon} />
              </button>
              <p
                className={styles.pagesInfo}
              >{`${pageNumber} / ${numPages}`}</p>
              <button onClick={handleNext} className={styles.controlNextBtn}>
                <IonIcon src={ArrowLeftIcon} />
              </button>
            </div>
            <div className={styles.controlsRight}>
              <button
                className={styles.controllsFullscreenOn}
                // onClick={() => setFullscreen((prev) => !prev)}
              >
                {/* <FullscreenIcon /> */}
              </button>
            </div>
          </div>
          <button
            className={styles.prevBtnLarge}
            onClick={handlePrev}
            ref={PrevBtnRef}
          >
            {/* <PrevIcon /> */}
          </button>
          <button
            className={styles.nextBtnLarge}
            onClick={handleNext}
            ref={NextBtnRef}
          >
            {/* <NextIcon /> */}
          </button>
        </>
      )}
      <Document
        file={fileObj}
        options={options}
        onLoadSuccess={onLoadSuccess}
        onLoadError={console.error}
        className={styles.document}
        loading={null}
      >
        {containerRef.current && (
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            width={document.body.clientWidth - 60}
            // height={fullscreen ? fullscreenHeight : null}
            // width={containerRef.current?.clientWidth}
            loading={null}
            onLoadSuccess={handlePageLoadSuccess}
          />
        )}
        {/* {pageNumber !== numPages && (
          <Page
            pageNumber={pageNumber + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            // width={fullscreen ? null : pageWidthInPx}
            // height={fullscreen ? fullscreenHeight : null}
            // width={containerRef.current?.clientWidth}
            canvasRef={canvasRef}
            loading={null}
            onLoadSuccess={() => setPageLoadedSucces(true)}
          />
        )} */}
      </Document>
    </div>
  );
};

function areEqual(prevProps: PDFReaderType, nextProps: PDFReaderType) {
  return (
    prevProps.pdf === nextProps.pdf &&
    prevProps.fullscreen === nextProps.fullscreen
  );
}

export default React.memo(PDFReader, areEqual);
