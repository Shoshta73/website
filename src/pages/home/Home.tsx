import { memo } from "react";

import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <h1 className="alert">SITE IS WORK IN PROGRESS</h1>
      <div className="about">
        <h2>Hi I am Shoshta</h2>
        <div className="prompt">
          <p>A software developer</p>
          <p>A problem solver</p>
          <p>A learner</p>
          <p>A explorer</p>
          <p>with passion for creating</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
