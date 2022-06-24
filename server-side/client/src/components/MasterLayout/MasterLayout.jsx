//External Lib  imports
import React, { useState } from "react";

//Internal Lib  imports
import Navigation from "../../partials/Navigation";
import SideBar from "../../partials/SideBar";

function MasterLayout(props) {
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <>
      <Navigation
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        title={props.title}
      />
      <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className={openMenu ? "content" : "content-expand"}>
        {props.children}
      </div>
    </>
  );
}

export default MasterLayout;
