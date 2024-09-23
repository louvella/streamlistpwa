import React from "react";
import { Link } from "react-router-dom";

function UserPassword() {
  return (
    <div className="streamlist-home-container">
      <nav className="submenu">
        <ul>
          <li><Link to="/user/information">Information</Link></li>
          <li><Link to="/user/password">Password</Link></li>
          <li><Link to="/user/payment">Payment</Link></li>
          <li><Link to="/user/subscription">Subscription</Link></li>
        </ul>

      </nav>
      <h1>Change User Password</h1>
      <div>Old Password: xxxxxxxxxxxxxxxxxx
        <p>New Password: xxxxxxxxxxxxxxxxxx</p>
        <p>Verify New Password: xxxxxxxxxxxxxxxxxx</p>
        </div>
    </div>
  );
}

export default UserPassword;
