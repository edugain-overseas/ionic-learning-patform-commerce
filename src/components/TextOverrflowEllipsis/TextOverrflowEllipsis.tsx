import styles from "./TextOverrflowEllipsis.module.scss";

const TextOverrflowEllipsis = ({ text }: { text: string }) => {
  return (
    <span className={styles.textSpan} title={text}>
      {text}
    </span>
  );
};

export default TextOverrflowEllipsis;
