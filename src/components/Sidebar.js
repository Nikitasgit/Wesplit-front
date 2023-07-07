import React from "react";
import { ImBin } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>WeSplit</h1>
      <div className="menu-sidebar">
        <div className="btns-sidebar">
          <button>Details</button>
          <button>Refund a team mate</button>
        </div>
        <h3>My teams:</h3>
        <div className="teams">
          <button>
            Family <BiEditAlt className="edit" /> <ImBin className="delete" />
          </button>
          <button>
            Class mates <BiEditAlt className="edit" />
            <ImBin className="delete" />
          </button>
        </div>
        <button>About</button>
      </div>
    </div>
  );
};

export default Sidebar;
