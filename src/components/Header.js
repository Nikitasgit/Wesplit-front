import axios from "axios";
import React, { useRef, useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { RiAddCircleLine } from "react-icons/ri";
import Userslist from "./Userslist";
import { useDispatch } from "react-redux";
import { createUser } from "../feature/user.slice";
import { outsideClick } from "./OutsideClickFunction";
const Header = () => {
  const [fullName, setFullName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [addUser, setAddUser] = useState(false);
  const addUserRef = useRef();
  outsideClick(addUserRef, setAddUser);
  const dispatch = useDispatch();
  const userData = {
    fullName,
    pseudo,
  };
  const handleForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/user", userData);
    dispatch(createUser(userData));
    setFullName("");
    setPseudo("");
  };

  return (
    <div className="header">
      <div className="add-user" ref={addUserRef}>
        <GoPersonAdd
          className="add-user-icon"
          onClick={() => {
            setAddUser(!addUser);
          }}
        />
        {addUser ? (
          <form className="add-user-form" onSubmit={handleForm}>
            <div>
              <h5>Fullname:</h5>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <h5>pseudo:</h5>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => {
                  setPseudo(e.target.value);
                }}
              />
            </div>
            <button type="submit">
              <RiAddCircleLine className="add-icon" />
            </button>
          </form>
        ) : null}
      </div>
      <Userslist />
    </div>
  );
};

export default Header;
