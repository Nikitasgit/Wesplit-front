import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Card from "./components/Card";
import Resume from "./components/Resume";
import Notes from "./components/Notes";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <Card />
        <div className="grid-resume-notes">
          <Resume />
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default App;
