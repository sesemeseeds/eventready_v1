import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="header">
      <div className="empty-div"></div> {/* Empty div */}
      <div className="logo-container">
        <img src="../src/images/ERlogo.png" alt="Event Ready Logo" className="logo" />
      </div>
      <h1 className="headerText">
        <Link to="/dashboard">Event Ready</Link>
      </h1>
      <div className="user-info">
        {isLoaded && isSignedIn ? (
          <div>
            <UserButton />
          </div>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
      <div className="empty-div"></div> {/* Empty div */}
    </div>
  );
}
