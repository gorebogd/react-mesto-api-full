import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";

function Register(props) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = userData;
    props.handleSignUp(email, password);
  };

  return (
    <>
      <Header page="signup" />
      <div className="login">
        <div className="login__containter">
          <h1 className="login__title">Регистрация</h1>
          <form onSubmit={handleSubmit} className="login__form">
            <input
              id="email"
              name="email"
              type="email"
              className="login__input"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              className="login__input"
              placeholder="Пароль"
              value={userData.password}
              onChange={handleInputChange}
            />

            <button type="submit" className="login__button">
              Зарегистрироваться
            </button>
          </form>
        </div>

        <div className="login__button-containter">
          <div className="login__button-caption">
            <span>Уже зарегистрированы?</span>
            <Link to="/signin" className="login__link">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
