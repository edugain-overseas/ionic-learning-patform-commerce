import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SheetModalAuto from "../components/SheetModalAuto/SheetModalAuto";
import { useUser } from "./UserContext";
import SingupForm from "../components/Auth/SingupForm";
import LoginForm from "../components/Auth/LoginForm";
import PasswordRecoveryForm from "../components/Auth/PasswordRecoveryForm";
import UserActivationForm from "../components/Auth/UserActivationForm";

type modalName =
  | "sing-up"
  | "sing-in"
  | "password-recovery"
  | "user-activation";

type ModalType = {
  name: modalName;
  ref: React.RefObject<HTMLIonModalElement> | null;
};

type CallbackType = (...ars: any) => void;

type AuthUIContextType = {
  openAuthUI: (type: modalName) => void;
  setSuccessAuthCallback: (callback: CallbackType) => void;
};

const AuthUIContext = createContext<AuthUIContextType | undefined>(undefined);

export const useAuthUi = () => useContext(AuthUIContext);

export const AuthUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const accessToken = useUser()?.user.accessToken;
  const studentId = useUser()?.user.studentId;

  const [modals, setModals] = useState<ModalType[]>([]);
  const callbackRef = useRef<CallbackType | null>(null);

  const setSuccessAuthCallback = (callback: CallbackType) => {
    callbackRef.current = callback;
  };

  useEffect(() => {
    if (accessToken) {
      modals.forEach((modal) => modal.ref?.current?.dismiss());
    }
    if (accessToken && studentId && callbackRef.current) {
      console.log(callbackRef.current);
      console.log(studentId);

      callbackRef.current(studentId);
      callbackRef.current = null;
    }
  }, [accessToken, studentId]);

  const openAuthUI = (type: modalName) => {
    if (accessToken) return;
    callbackRef.current = null;
    modals.find((modal) => {
      if (modal.name === type) {
        modal.ref?.current?.present();
      }
    });
  };

  return (
    <AuthUIContext.Provider value={{ openAuthUI, setSuccessAuthCallback }}>
      <>
        {children}
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "sing-up"),
              { name: "sing-up", ref: modalRef },
            ])
          }
        >
          <SingupForm modals={modals} />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "sing-in"),
              { name: "sing-in", ref: modalRef },
            ])
          }
        >
          <LoginForm modals={modals} />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "password-recovery"),
              { name: "password-recovery", ref: modalRef },
            ])
          }
        >
          <PasswordRecoveryForm />
        </SheetModalAuto>
        <SheetModalAuto
          setModal={(modalRef) =>
            setModals((prev) => [
              ...prev.filter((modal) => modal.name !== "user-activation"),
              { name: "user-activation", ref: modalRef },
            ])
          }
        >
          <UserActivationForm modals={modals} />
        </SheetModalAuto>
      </>
    </AuthUIContext.Provider>
  );
};
