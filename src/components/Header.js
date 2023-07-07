import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const Header = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <div className="header">
      <button className="add-user">+</button>

      {!dropdownActive ? (
        <div className="dropdown">
          <BsChevronDown
            className="chevron"
            onClick={() => {
              setDropdownActive(true);
            }}
          />
          <div className="user-dropdown">
            <h4>Mikeal Louth </h4>
            <img src="" alt="" />
          </div>
        </div>
      ) : (
        <div className="dropdown">
          <BsChevronRight
            className="chevron"
            onClick={() => {
              setDropdownActive(false);
            }}
          />
          <div className="users-list-container">
            <div className="users-list">
              <div className="user-list">
                <h4>Mikeal Louth </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Bob kakou </h4> <img src="" alt="" />
              </div>{" "}
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
              <div className="user-list">
                <h4>Mirriam Azouladou </h4> <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
