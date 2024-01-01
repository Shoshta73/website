import { memo } from "react";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default memo(Spinner);
