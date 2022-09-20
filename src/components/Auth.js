import React from "react";

const Auth = () => {
  return (
    <main>
      <form className="auth-form">
        <input className="auth-input" type="text" placeholder="enter username" />
        <input className="auth-input" type="text" placeholder="enter password"/>
        <button className="auth-btn" onClick="#">Login</button>
      </form>
    </main>
  );
};

export default Auth;
