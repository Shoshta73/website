import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="app-content-container">{children}</div>
    </>
  );
};

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        </Routes>
      </Router>
    </div>
  );
}
