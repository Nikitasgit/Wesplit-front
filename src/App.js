import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Main from "./components/Main";
const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <Main />
    </div>
  );
};

export default App;
