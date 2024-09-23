import React from "react";
import { Link } from "react-router-dom";

function UserPage() {
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
      <h1>Membership Information</h1>
        <div><p>Member Name: John Smith</p>
        <p>Current Subscription: Platinum Plan $29.99mo.</p>
        <p>Payment Method: xxxx xxxx xxxx xxxx Expiration: 8/2028</p>

        </div>
    </div>
  );
}

export default UserPage;
