import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "@Components";
import "./App.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
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
        </Routes>
      </Router>
    </div>
  );
}
