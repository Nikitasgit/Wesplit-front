import React, { useState } from "react";
import AddExpenses from "./AddExpenses";
import { useSelector } from "react-redux";
import { BsInfoCircle } from "react-icons/bs";
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
      <div className="expenses-date-display">
        <h3>Your expenses since</h3>
        <h4>18 April 2023</h4>
      </div>
      <div className="total-expenses">
        <h2>{currentUser && currentUser.expenses}€</h2>
        <BsInfoCircle />
      </div>
    </div>
  );
};

export default Card;
