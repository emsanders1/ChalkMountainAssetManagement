import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch("http://localhost:8090/api/ldap", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.forms[0].uname.value,
        password: document.forms[0].pass.value     
      }),
      credentials: 'include'
    });
  
    if (response.ok) {
        window.location.href = "http://localhost:3000/home";
    } else {
      const error = await response.json();
      setErrorMessages({ name: "login", message: error.message });
    }
  };
  
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="uname" required/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input value="Submit" type="submit" />
          <input
            className="continue-button"
            type="submit"
            value="Continue..."
            onClick={() => {
              window.location.href = "http://localhost:3000/home";
            }}
          />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
      <img  class="img" src={require('../imgs/chalk-logo.png')}alt="pic"></img>
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}
