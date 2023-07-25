import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGroup } from "../feature/currentGroup.slice";

const Resume = () => {
  const displayDebts = (users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].debt <= 0) {
        return ` <li> ${users[i].name}has to receive  ${twoDigitsAfterNumber(
          Math.abs(users[i].debt)
        )}€</li>`;
      } else if (users[i].debt > 0) {
        debtsDisplay.innerHTML += ` <li> ${
          users[i].name
        } owns  ${twoDigitsAfterNumber(users[i].debt)}€</li>`;
      }
    }
  };
  // const currentUser = useSelector((state) => state.currentUser.currentUser);
  // const groups = useSelector((state) => state.groups.groupsData);
  const currentGroup = useSelector((state) => state.currentGroup.currentGroup);
  return (
    <div className="resume">
      <h3>expenses</h3>
      {currentGroup &&
        currentGroup.users?.map((user) => (
          <div>
            <ul>
              <li key={user._id}>
                {user.fullName} {user.expenses} €
              </li>
            </ul>
            <ul>
              <li></li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Resume;
