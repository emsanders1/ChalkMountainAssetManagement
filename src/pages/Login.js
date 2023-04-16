import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const response = await fetch("http://tcu-dev02:8090/api/ldap", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.forms[0].uname.value,
        password: document.forms[0].pass.value     
      })
    });

    setIsSubmitted(true);
    // window.location.href = "http://localhost:3000/home";
  };
  

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input value="Submit" type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
      <img  class="img" src={require('../imgs/chalk-logo.png')}alt="pic"></img>
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in.</div> : renderForm}
      </div>
    </div>
  );
}