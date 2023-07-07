import React from "react";

const Main = () => {
  return (
    <div className="main">
      <div className="user">
        <h2>Welcome,</h2>
        <h3>Miky</h3>
      </div>
      <div className="inputs">
        <div className="add-expense">
          <h4>Add expense:</h4>
          <input type="number" />
        </div>
        <div className="why-expense">
          <h4>What was your expense for?</h4>
          <input type="text" />
        </div>
        <div className="who-expense">
          <input type="checkbox" name="" id="" />
        </div>
        <button>+</button>
      </div>
      <div className="expenses-date-display">
        <h4>Your expenses since</h4>
        <h3>18 April 2023</h3>
      </div>
      <h2>230 €</h2>
      <button>i</button>
    </div>
  );
};

export default Main;
