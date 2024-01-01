import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "@Components";
import { Home, Projects } from "@Pages";

import "./App.css";

const LayoutNoSpacer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="app-content-container">{children}</div>
      <Footer />
    </>
  );
};

const LayoutSpacer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="app-spacer"></div>
      <div className="app-content-container">{children}</div>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutNoSpacer>
                <Home />
              </LayoutNoSpacer>
            }
          />
          <Route
            path="/projects"
            element={
              <LayoutSpacer>
                <Projects />
              </LayoutSpacer>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
