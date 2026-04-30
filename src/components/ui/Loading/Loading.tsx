import React from "react";
import "./Loading.scss";

interface LoadingProps {
  message?: string;
  isFullPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Please wait...",
  isFullPage = false,
}) => {
  return (
    <div
      className={`loading-wrapper ${isFullPage ? "loading-wrapper--full-page" : ""}`}
    >
      <div className="loading-wrapper__spinner"></div>
      <span className="loading-wrapper__text">{message}</span>
    </div>
  );
};

export default Loading;
