import React from "react";
import { Link } from "react-router-dom";

function UserPayment() {
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
      <h1>Change Credit Card</h1>
      <div>Current Credit Card: xxxx xxxx xxxx xxxx Expiration: 8/2028
        <p>New Credit Card Number: xxxxxxxxxxxxxxxxxx</p>
        <p>Expiration: xx/xx</p>
        <p>Code: xxxx</p>
        </div>
    </div>
  );
}

export default UserPayment;

