import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import { GoPersonAdd } from "react-icons/go";
import { deleteGroup, getGroups } from "../feature/group.slice";
import { getCurrentGroup } from "../feature/currentGroup.slice";
import { getCurrentUser } from "../feature/currentUser.slice";
import { getUsers } from "../feature/user.slice";
import { useDispatch, useSelector } from "react-redux";

const Group = ({ group }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersData);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const groups = useSelector((state) => state.groups.groupsData);
  const [groupUsersList, setGroupUsersList] = useState([]);
  const [addMember, setAddMember] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [currentGroup, setCurrentGroup] = useState();

  const handleDeleteGroup = () => {
    let text =
      "Your group will be deleted after confirmation, do you want to confirm?";
    if (confirm(text) == true) {
      axios.delete("http://localhost:5001/group/" + group._id);
      dispatch(deleteGroup(group._id));
    } else return group;
  };
  useEffect(() => {
    dispatch(
      getCurrentGroup(groups && currentGroup ? currentGroup : groups[0])
    );
  }, [groups, currentGroup]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleAddMember = (member, group) => {
    axios
      .put("http://localhost:5001/group/" + group._id, {
        users: [...currentGroup.users, member],
      })
      .then(() => {
        dispatch(getGroups());
        dispatch(getCurrentGroup());
      });
  };

  return (
    <div>
      <div
        className="group"
        onClick={() => {
          setCurrentGroup(group);
          group.users.map((user) =>
            setGroupUsersList((groupList) => [...groupList, user._id])
          );
        }}
      >
        <button
          onClick={() => {
            setGroupList(!groupList);
            setAddMember(false);
          }}
        >
          {group.name}
        </button>
        <div className="btns-group">
          <GoPersonAdd
            onClick={() => {
              setAddMember(!addMember);
              setGroupList(false);
            }}
          />
        </div>
        {currentUser.fullName === group.author ? (
          <div className="delete-member">
            <ImBin
              onClick={() => {
                handleDeleteGroup();
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="group-list">
        {groupList
          ? currentGroup.users.map((user) => (
              <button
                className={
                  currentUser && user._id !== currentUser._id
                    ? null
                    : "current-user"
                }
                key={user._id}
                onClick={() => {
                  dispatch(getCurrentUser(user));
                }}
              >
                {user.fullName}
              </button>
            ))
          : null}
      </div>
      <div className="add-member-list">
        {addMember
          ? users
              .filter((user) => !groupUsersList.includes(user._id))
              .map((user) => (
                <button
                  key={user._id}
                  onClick={() => {
                    handleAddMember(user, currentGroup);
                    setAddMember(!addMember);
                  }}
                >
                  {user.fullName}
                </button>
              ))
          : null}
      </div>
    </div>
  );
};

export default Group;
