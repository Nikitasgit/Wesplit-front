import axios from "axios";
import React, { useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { RiAddCircleLine } from "react-icons/ri";
import Userslist from "./Userslist";
const Header = () => {
  const [fullName, setFullName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [addUser, setAddUser] = useState(false);
  const handleForm = () => {
    axios.post("http://localhost:5001/user", {
      fullName,
      pseudo,
    });
  };

  return (
    <div className="header">
      <div className="add-user">
        <GoPersonAdd
          className="add-user-icon"
          onClick={() => {
            setAddUser(!addUser);
          }}
        />
        {addUser ? (
          <form className="add-user-form">
            <div>
              <h5>Fullname:</h5>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <h5>pseudo:</h5>
              <input
                type="text"
                onChange={(e) => {
                  setPseudo(e.target.value);
                }}
              />
            </div>
            <RiAddCircleLine
              className="add-icon"
              onClick={() => handleForm()}
            />
          </form>
        ) : null}
      </div>
      <Userslist />
    </div>
  );
};

export default Header;
