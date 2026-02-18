import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export const useNavigationBlocker = (when: boolean) => {
  const history = useHistory();
  const unblockRef = useRef<null | (() => void)>(null);
  const nextLocationRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!when) {
      unblockRef.current?.();
      unblockRef.current = null;
      return;
    }

    unblockRef.current = history.block((tx) => {
      nextLocationRef.current = tx;
      setIsOpen(true);
      return false;
    });

    return () => {
      unblockRef.current?.();
    };
  }, [when, history]);

  const confirm = () => {
    unblockRef.current?.();
    unblockRef.current = null;

    setIsOpen(false);

    if (nextLocationRef.current) {
      history.push(nextLocationRef.current.pathname);
    }
  };

  const cancel = () => {
    setIsOpen(false);
    nextLocationRef.current = null;
  };

  return { isOpen, confirm, cancel };
};
