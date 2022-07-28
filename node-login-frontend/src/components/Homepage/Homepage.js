import React from "react";
import "./Homepage.css";

function Homepage({ setLoginUser }) {
  return (
    <div className="homepage">
      <h1> Homepage </h1>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
    </div>
  );
}

export default Homepage;
