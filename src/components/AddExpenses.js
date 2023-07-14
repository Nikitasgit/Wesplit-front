import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { RiAddCircleLine } from "react-icons/ri";

const AddExpenses = () => {
  return (
    <div className="add-expenses">
      <div className="inputs-expense">
        <div className="amount-expense">
          <h4>Add expense:</h4>
          <input type="number" className="amount-input" />
        </div>
        <div className="why-expense">
          <h4>What was your expense for?</h4>
          <input type="text" />
        </div>
        <div className="who-expense">
          <label htmlFor="group">
            <input type="radio" name="group" id="group" checked />
            Group
          </label>
          <label htmlFor="personal">
            <input type="radio" name="personal" id="personal" />
            Personal
          </label>
          <label htmlFor="other">
            <input type="radio" name="other" id="other" />
            Other member
          </label>
        </div>
        <RiAddCircleLine className="add-icon" />
      </div>
      <div className="expenses-date-display">
        <h3>Your expenses since</h3>
        <h4>18 April 2023</h4>
      </div>
      <div className="total-expenses">
        <h2>230 €</h2>
        <BsInfoCircle />
      </div>
    </div>
  );
};

export default AddExpenses;
