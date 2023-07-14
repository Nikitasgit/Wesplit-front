import React, { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import { RiAddCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { editGroup, getGroups } from "../feature/group.slice";
import { getCurrentGroup } from "../feature/currentGroup.slice";
import { GoPersonAdd } from "react-icons/go";
import Userslist from "./Userslist";
import axios from "axios";

const Sidebar = () => {
  const handleAddMember = (member, group) => {
    axios.put("http://localhost:5001/group/" + group._id, {
      users: [...currentGroup.users, member],
    });
  };
  const [addMember, setAddMember] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [currentGroup, setCurrentGroup] = useState();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groupsData);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const users = useSelector((state) => state.users.usersData);
  useEffect(() => {
    dispatch(getGroups());
    dispatch(getCurrentGroup(currentGroup));
  }, []);
  return (
    <div className="sidebar">
      <h1>WeSplit</h1>
      <div className="menu-sidebar">
        <div className="btns-sidebar">
          <button>Details</button>
          <button>Refund a team mate</button>
          <button>
            Create new team <RiAddCircleLine />
          </button>
        </div>
        <h3>My teams:</h3>
        <div className="groups">
          {groups &&
            groups.map((group) =>
              group.users.map((user) =>
                user._id == currentUser?._id ? (
                  <div className="group-container" key={group._id}>
                    <div className="group">
                      <button
                        onClick={(e) => {
                          setAddMember(false);
                          setCurrentGroup(group);
                          setGroupList(!groupList);
                        }}
                      >
                        {group.name}
                      </button>
                      <div className="btns-group">
                        <BiEditAlt className="edit" />{" "}
                        <ImBin className="delete" />
                        <GoPersonAdd
                          onClick={() => {
                            setGroupList(false);
                            setAddMember(!addMember);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group-list">
                      {groupList
                        ? group.users.map((user) => (
                            <button key={user._id}>{user.fullName}</button>
                          ))
                        : null}
                      {addMember
                        ? users.map((user) => (
                            <button
                              key={user._id}
                              onClick={() => {
                                setAddMember(false);
                                setGroupList(true);
                                handleAddMember(user, group);
                              }}
                            >
                              {user.fullName}
                            </button>
                          ))
                        : null}
                    </div>
                  </div>
                ) : null
              )
            )}
        </div>
        <button>About</button>
      </div>
    </div>
  );
};

export default Sidebar;
