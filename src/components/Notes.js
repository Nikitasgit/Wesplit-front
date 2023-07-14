import React from "react";

const Notes = () => {
  return (
    <div>
      <div className="notes">
        <h4>Notes:</h4>
        <div className="messages">
          <div className="message">
            <h5>John Monroe:</h5>
            <p>Hello guys! 1</p>
          </div>
          <div className="message">
            <h5>John Monroe:</h5>
            <p>Hello guys! How are you doing today ? 2 </p>
          </div>
          <div className="message">
            <h5>John Monroe:</h5>
            <p>Hello guys! 3</p>
          </div>
        </div>
        <input type="text" />
      </div>
    </div>
  );
};

export default Notes;
