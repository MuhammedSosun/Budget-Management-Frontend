import React, { createContext, useState, useCallback, useMemo } from "react";
import Loading from "../components/ui/Loading/Loading";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
export { LoadingContext };

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");

  const showLoading = useCallback(
    (message = "Processing is in progress...") => {
      setMsg(message);
      setActive(true);
    },
    [],
  );

  const hideLoading = useCallback(() => {
    setActive(false);
  }, []);

  const value = useMemo(
    () => ({ showLoading, hideLoading }),
    [showLoading, hideLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {active && <Loading isFullPage message={msg} />}
      {children}
    </LoadingContext.Provider>
  );
};
