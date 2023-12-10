import React from "react";
import NavigationButton from "./NavigationButton";
import "./UserControls.css";

const UserControls = ({ isAuthenticated, user, onLogout, onLogin }) =>
  isAuthenticated && user ? (
    <div>
      {/* <span>{user.username}</span> */}
      <div>
        <NavigationButton
          onClick={onLogout}
          imagePath="/images/logout.svg"
          buttonText="Log-Out"
        />
      </div>
    </div>
  ) : (
    <NavigationButton
      onClick={onLogin}
      imagePath="/images/login.svg"
      buttonText="Log-In"
    />
  );

export default UserControls;
