import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Toast from "~/components/Toast";
import { FieldErrors } from "react-hook-form";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
  type: ToastType;
  message: string | FieldErrors<any>;
  duration: number;
}

export interface ToastContextType {
  success: (msg: string | FieldErrors<any>, duration?: number) => void;
  error: (msg: string | FieldErrors<any>, duration?: number) => void;
  info: (msg: string | FieldErrors<any>, duration?: number) => void;
  warning: (msg: string | FieldErrors<any>, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const show = useCallback(
    (
      type: ToastType,
      message: string | FieldErrors<any>,
      duration: number = 5000,
    ) => {
      setToast({ type, message, duration });
    },
    [],
  );

  const hide = () => setToast(null);

  const contextValue: ToastContextType = {
    success: (msg, duration) => show("success", msg, duration),
    error: (msg, duration) => show("error", msg, duration),
    info: (msg, duration) => show("info", msg, duration),
    warning: (msg, duration) => show("warning", msg, duration),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hide}
        />
      )}
    </ToastContext.Provider>
  );
};
