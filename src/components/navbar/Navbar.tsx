import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";

import "./Navbar.css";

/**
 * Creates a space between the menu buttons and the links in the navbar.
 * The width of the space is dynamically adjusted based on the width of the menu buttons.
 *
 * @returns The Spacer component.
 */
const Spacer = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = document.getElementById("navbar-buttons");
    const width = element?.offsetWidth ?? 0;
    setWidth(width);
  });

  useEffect(() => {
    const handleResize = () => {
      const buttonsWidth =
        document.getElementById("navbar-buttons")?.clientWidth ?? 0;
      setWidth(buttonsWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div style={{ width: width }} id="spacer" />;
};

const Links = ({ location }: { location: string }) => {
  return (
    <div className="links">
      <div className={"link-box" + (location === "/" ? " current-link" : "")}>
        <Link to="/">Home</Link>
      </div>
      <div
        className={
          "link-box" + (location === "/projects" ? " current-link" : "")
        }
      >
        <Link to="/projects">Projects</Link>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <div className="navbar">
      <div className="navbar-container">
        {width <= 900 ? (
          <></>
        ) : (
          <>
            <Spacer />
            <Links location={location.pathname} />
          </>
        )}
        <div className="navbar-buttons" id="navbar-buttons">
          <button
            className="navbar-menu-button"
            onClick={() => setExpanded(!expanded)}
          >
            <MenuIcon size={50} />
          </button>
        </div>
      </div>
      {width < 900 ? (
        expanded && (
          <div className="links-small-screen">
            <Links location={location.pathname} />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(Navbar);
