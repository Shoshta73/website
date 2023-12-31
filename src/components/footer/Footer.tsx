import { memo } from "react";
import { GithubIcon } from "lucide-react";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media">
        <GithubIcon size={50} />
      </div>
      <p>&copy; 2023 Borna Šoštarić</p>
    </div>
  );
};

export default memo(Footer);
