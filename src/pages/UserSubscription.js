import React from "react";
import { Link } from "react-router-dom";

function UserSubscription() {
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
      <h1>User Subscription</h1>
      <div>Current Subscription: Platinum Plan $29.99mo.
        <p>Select New Subscription</p>
        </div>
    </div>
  );
}

export default UserSubscription;
