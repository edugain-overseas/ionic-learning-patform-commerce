import { FC, ReactNode, useState } from "react";
import { downloadFile } from "../../utils/downloadFile";

const AnchorDownload: FC<{
  href: string;
  download: string;
  children: ReactNode;
  className?: string;
}> = ({ href, download, children, className }) => {
  const [fetching, setFetching] = useState<boolean>(false);

  const handleDownload = async () => {
    setFetching(true);
    await downloadFile(href, download);
    setFetching(false);
  };

  return (
    <button
      disabled={fetching}
      onClick={handleDownload}
      aria-label="download file"
      className={className ? className : ""}
    >
      {children}
    </button>
  );
};

export default AnchorDownload;
