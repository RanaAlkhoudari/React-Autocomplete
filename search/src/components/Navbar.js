import React from "react";

function Navbar() {
  return (
    <>
      <nav>
        <div>
          <ul className="left-side">
            <li>Client's Info</li>
          </ul>
          <ul className="right-side">
            <li>About</li>
            <li>Contact</li>
            <li>Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
