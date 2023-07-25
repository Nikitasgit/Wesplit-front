import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { FaUserNinja } from "react-icons/fa";
import { getUsers } from "../feature/user.slice";
import { getCurrentUser } from "../feature/currentUser.slice";
import { useDispatch, useSelector } from "react-redux";
import { outsideClick } from "./OutsideClickFunction";
const Userslist = () => {
  const dispatch = useDispatch();
  const [dropdownActive, setDropdownActive] = useState(false);
  const users = useSelector((state) => state.users.usersData);
  const dropdownRef = useRef();
  outsideClick(dropdownRef, setDropdownActive);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
  }, []);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [currentMember, setCurrentMember] = useState();

  useEffect(() => {
    dispatch(getCurrentUser(currentMember));
  }, [currentMember]);

  return (
    <div>
      {!dropdownActive ? (
        <div
          className="dropdown"
          ref={dropdownRef}
          onClick={() => {
            setDropdownActive(true);
          }}
        >
          <BsChevronDown className="chevron" />
          <div className="user-dropdown">
            <h3>{currentUser ? currentUser.fullName : users[0]?.fullName}</h3>
            <FaUserNinja />
          </div>
        </div>
      ) : (
        <div
          className="dropdown"
          ref={dropdownRef}
          onClick={() => {
            setDropdownActive(!dropdownActive);
          }}
        >
          <div className="chevron">
            <BsChevronRight />
          </div>
          <div className="users-list-container">
            <div className="users-list">
              {users.map((user) => (
                <h4
                  className={
                    user._id == currentUser._id
                      ? "user-list current-user"
                      : "user-list"
                  }
                  key={user._id}
                  onClick={() => {
                    setCurrentMember(user);
                  }}
                >
                  {user.fullName}
                </h4>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userslist;
