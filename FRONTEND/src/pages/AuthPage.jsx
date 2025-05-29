import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {

    const [login, setlogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        URL Shortener
      </h1>
      {login ? <LoginForm state={setlogin} /> : <RegisterForm state={setlogin}/>}
    </div>
  );
};

export default AuthPage;
