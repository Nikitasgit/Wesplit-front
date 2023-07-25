import React, { useEffect, useRef, useState } from "react";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import { RiAddCircleLine } from "react-icons/ri";
import { createGroup, getGroups } from "../feature/group.slice";
import { getUsers } from "../feature/user.slice";
import { getCurrentUser } from "../feature/currentUser.slice";
import axios from "axios";
import { outsideClick } from "./OutsideClickFunction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersData);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const groups = useSelector((state) => state.groups.groupsData);
  const [createNewTeam, setCreateNewTeam] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const aboutRef = useRef();
  outsideClick(aboutRef, setAboutActive);
  useEffect(() => {
    dispatch(getCurrentUser(users && currentUser ? currentUser : users[0]));
  }, [users]);

  const [groupName, setGroupName] = useState("");
  const data = {
    name: groupName,
    author: currentUser?.fullName,
    users: [currentUser],
    _id: Date.now(),
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/group", data).then(() => {
      dispatch(createGroup(data));
      dispatch(getGroups());
      setGroupName("");
    });
  };
  useEffect(() => {
    dispatch(getGroups());
    dispatch(getUsers());
  }, []);
  return (
    <div className="sidebar">
      <h1>WeSplit</h1>
      <div className="menu-sidebar">
        <div className="btns-sidebar">
          <button>Details</button>
          <button>Refund a team mate</button>
          <button>
            Create new team
            <RiAddCircleLine
              onClick={() => {
                setCreateNewTeam(!createNewTeam);
              }}
            />
          </button>
          {createNewTeam ? (
            <form onSubmit={handleSubmitForm}>
              <input
                type="text"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <button type="submit">create</button>
            </form>
          ) : null}
        </div>
        <h3>My teams:</h3>
        <div className="groups">
          {groups &&
            groups.map(
              (group) =>
                group &&
                group.users.map((user) =>
                  currentUser && user._id == currentUser._id ? (
                    <Group key={group._id} group={group} />
                  ) : null
                )
            )}
        </div>
        <button
          ref={aboutRef}
          onClick={() => {
            setAboutActive(true);
          }}
        >
          About
        </button>
        {aboutActive ? (
          <div>
            <h1>hi</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
