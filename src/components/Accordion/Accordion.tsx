import React, { useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import ChevronIcon from "../../assets/icons/chevron.svg";
import InsetBtn from "../../components/InsetBtn/InsetBtn";
import styles from "./Accordion.module.scss";

interface AccordionTypes {
  header: React.ReactNode;
  content: React.ReactNode;
  headerClassname?: string;
  contentClassname?: string;
}

const Accordion: React.FC<AccordionTypes> = ({
  header,
  content,
  headerClassname = "",
  contentClassname = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? "0"
        : `${contentRef.current.scrollHeight}px`;
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={styles.accordionWrapper} id={isOpen ? "open" : "closed"}>
      <div className={`${styles.accordionHeader} ${headerClassname}`}>
        {header}
        <div className={styles.chevronInner} id="accordion-toggle">
          <InsetBtn
            icon={
              <IonIcon
                src={ChevronIcon}
                className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
              />
            }
            ripple={true}
            width="32rem"
            height="32rem"
            backgroundColor={isOpen ? "#7E8CA8" : undefined}
            onClick={handleToggle}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className={`${styles.accordionContent} ${contentClassname}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
