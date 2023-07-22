import React from "react";
import { useSelector } from "react-redux";

const Resume = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  return (
    <div className="resume">
      <h4>{currentUser ? currentUser.fullName : "hi"}</h4>
    </div>
  );
};

export default Resume;
