import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { FaUserNinja } from "react-icons/fa";
import { getUsers } from "../feature/user.slice";
import { getCurrentUser } from "../feature/currentUser.slice";
import { useDispatch, useSelector } from "react-redux";
const Userslist = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const users = useSelector((state) => state.users.usersData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser(currentUser));
    dispatch(getUsers());
  }, [currentUser]);

  return (
    <div>
      {!dropdownActive ? (
        <div
          className="dropdown"
          onClick={() => {
            setDropdownActive(true);
          }}
        >
          <BsChevronDown className="chevron" />
          <div className="user-dropdown">
            <h4>{currentUser ? currentUser.fullName : users[0]?.fullName}</h4>
            <FaUserNinja />
          </div>
        </div>
      ) : (
        <div
          className="dropdown"
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
                  className="user-list"
                  key={user._id}
                  onClick={() => {
                    setCurrentUser(user);
                    setDropdownActive(!dropdownActive);
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
