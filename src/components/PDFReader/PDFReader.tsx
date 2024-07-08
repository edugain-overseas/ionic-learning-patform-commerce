import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ArrowLeftIcon from "../../assets/icons/chevron.svg";
import PlayIcon from "../../assets/icons/player/play.svg";
import PauseIcon from "../../assets/icons/player/pause.svg";
import EnterFullscreenIcon from "../../assets/icons/player/fullscreen.svg";
import ExitFullscreenIcon from "../../assets/icons/player/fullscreen-exit.svg";
// import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
// import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
// import { ReactComponent as PrevIcon } from "../../images/icons/prev.svg";
// import { ReactComponent as NextIcon } from "../../images/icons/next.svg";
import { IonIcon } from "@ionic/react";
import styles from "./PDFReader.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  withCredentials: true,
};

interface PDFReaderType {
  pdf: string;
}

const PDFReader: FC<PDFReaderType> = ({ pdf }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [pageHeight, setPageHeight] = useState(0);

  // eslint-disable-next-line
  const [fileObj, setFileObj] = useState({ url: pdf });

  const containerRef = useRef<HTMLDivElement>(null);
  const interval = useRef<number | null>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageLoadSuccess = (info: { height: number }) => {
    setPageLoadedSucces(true);
    setPageHeight(info.height);
  };

  const handlePrev: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (pageNumber === 1) {
      return;
    }
    setPageNumber((prev) => prev - 1);
  };

  const handleNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setPageNumber((prev) => {
      if (prev === numPages) return 1;
      return prev + 1;
    });
  };

  const handleContainerClick = () => {
    setShowControls((prev) => !prev);
  };

  const handlePlay: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (playing && interval.current) {
      window.clearInterval(interval.current);
    } else {
      interval.current = window.setInterval(
        () =>
          setPageNumber((prev) => {
            if (prev === numPages) return 1;
            return prev + 1;
          }),
        5000
      );
    }
    setPlaying((prev) => !prev);
  };

  const handleFullscreen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (document.fullscreenElement === null) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      onClick={handleContainerClick}
      style={{ minHeight: pageLoadedSucces ? pageHeight : "auto" }}
    >
      {pageLoadedSucces && (
        <div
          className={`${styles.controlPanel} ${
            showControls ? styles.active : ""
          }`}
          ref={controlPanelRef}
        >
          <div className={styles.controlsCenter}>
            <button onClick={handlePrev} className={styles.controlPrevBtn}>
              <IonIcon src={ArrowLeftIcon} />
            </button>
            <button className={styles.controlPlayBtn} onClick={handlePlay}>
              <IonIcon src={playing ? PauseIcon : PlayIcon} />
            </button>
            <button onClick={handleNext} className={styles.controlNextBtn}>
              <IonIcon src={ArrowLeftIcon} />
            </button>
          </div>
          <div className={styles.controlsBottom}>
            <p className={styles.pagesInfo}>{`${pageNumber} / ${numPages}`}</p>
            <button
              className={styles.controllsFullscreenOn}
              onClick={handleFullscreen}
            >
              <IonIcon
                src={fullscreen ? ExitFullscreenIcon : EnterFullscreenIcon}
              />
            </button>
          </div>
        </div>
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
            width={
              fullscreen
                ? document.body.clientWidth
                : document.body.clientWidth - 60
            }
            loading={null}
            onLoadSuccess={handlePageLoadSuccess}
          />
        )}
      </Document>
    </div>
  );
};

function areEqual(prevProps: PDFReaderType, nextProps: PDFReaderType) {
  return prevProps.pdf === nextProps.pdf;
}

export default React.memo(PDFReader, areEqual);
