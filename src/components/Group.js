import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { deleteGroup, getGroups } from "../feature/group.slice";
import { getCurrentGroup } from "../feature/currentGroup.slice";
import { getCurrentUser } from "../feature/currentUser.slice";
import { getUsers } from "../feature/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { outsideClick } from "./OutsideClickFunction";

const Group = ({ group }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersData);
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const groups = useSelector((state) => state.groups.groupsData);
  const [groupUsersList, setGroupUsersList] = useState([]);
  const [addMember, setAddMember] = useState(false);
  const addMemberRef = useRef();
  outsideClick(addMemberRef, setAddMember);
  const [groupList, setGroupList] = useState(false);
  const groupListRef = useRef();
  outsideClick(groupListRef, setGroupList);
  const [deleteUserActive, setDeleteUserActive] = useState(false);
  const [editGroup, setEditGroup] = useState(false);

  const [currentGroup, setCurrentGroup] = useState();
  const [editGroupInput, setEditGroupInput] = useState("");
  const handleEditGroup = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5001/group/" + currentGroup._id, {
        name: editGroupInput,
      })
      .then(() => {
        dispatch(getGroups());
        dispatch(getCurrentGroup());
        setEditGroup(!editGroup);
      });
  };
  const handleDeleteGroup = () => {
    let text =
      "Your group will be deleted after confirmation, do you want to confirm?";
    if (confirm(text) == true) {
      axios.delete("http://localhost:5001/group/" + group._id);
      dispatch(deleteGroup(group._id));
    } else return group;
  };
  const handleDeleteMember = (member) => {
    if (member._id !== currentUser._id) {
      axios
        .put("http://localhost:5001/group/" + currentGroup._id, {
          users: currentGroup.users.filter((user) => user._id != member._id),
        })
        .then(() => {
          dispatch(getGroups());
          dispatch(getCurrentGroup());
        });
      setDeleteUserActive(!deleteUserActive);
    } else return group;
  };

  useEffect(() => {
    dispatch(
      getCurrentGroup(groups && currentGroup ? currentGroup : groups[0])
    );
  }, [groups, currentGroup]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentGroup());
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
            setGroupList(true);
          }}
        >
          {group.name}
        </button>
        {currentUser.fullName === group.author ? (
          <div className="btns-group">
            <AiOutlineUserDelete
              className={deleteUserActive ? "delete-btn-active" : "delete-btn"}
              onClick={() => {
                setDeleteUserActive(!deleteUserActive);
                groupList ? null : setGroupList(true);
              }}
            />
            <AiOutlineUserAdd
              onClick={() => {
                setAddMember(true);
              }}
            />

            <div className="author-btns">
              <div>
                <ImBin
                  onClick={() => {
                    handleDeleteGroup();
                  }}
                />
              </div>
              <div className="delete-member">
                <BiEditAlt
                  onClick={() => {
                    setEditGroup(!editGroup);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="group-list" ref={groupListRef}>
        {groupList
          ? currentGroup.users.map((user) => (
              <div>
                <button
                  className={
                    currentUser && user._id !== currentUser._id
                      ? deleteUserActive
                        ? "delete-active"
                        : null
                      : "current-user"
                  }
                  key={user._id}
                  onClick={() => {
                    deleteUserActive
                      ? handleDeleteMember(user)
                      : dispatch(getCurrentUser(user));
                  }}
                >
                  {user.fullName}
                </button>
              </div>
            ))
          : null}
      </div>
      <div className="add-member-list" ref={addMemberRef}>
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
      {editGroup ? (
        <form onSubmit={handleEditGroup}>
          <input
            type="text"
            value={editGroupInput}
            onChange={(e) => setEditGroupInput(e.target.value)}
          />
          <input type="submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Group;
