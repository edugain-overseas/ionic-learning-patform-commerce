import { FC, ReactNode, useState } from "react";

const AnchorDownload: FC<{
  href: string;
  download: string;
  children: ReactNode;
  className?: string;
}> = ({ href, download, children, className }) => {
  const [fetching, setFetching] = useState<boolean>(false);

  const handleDownload = () => {
    setFetching(true);
    fetch(href)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.style.display = "none";
        a.setAttribute("download", download);
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.log(error));
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
