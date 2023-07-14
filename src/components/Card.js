import React, { useState } from "react";
import AddExpenses from "./AddExpenses";
import { useSelector } from "react-redux";

const Card = () => {
  const users = useSelector((state) => state.users.usersData);
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <div className="card">
      <div className="user">
        <h2>Welcome,</h2>
        <h3>{currentUser ? currentUser.fullName : users[0]?.fullName}</h3>
      </div>
      <AddExpenses />
    </div>
  );
};

export default Card;
