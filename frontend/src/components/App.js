import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip.js";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarData) {
    api
      .setUserAvatar(avatarData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    function handleESCclose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleESCclose);
    return () => {
      document.removeEventListener("keydown", handleESCclose);
    };
  }, []);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const history = useHistory();
  function handleLogin(email, password) {
    auth
      .signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("email", email);
          setLoggedIn(true);
          history.push("/feed");
        }
      })
      .catch((err) => console.log(err));
  }

  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [signUpResult, setSignUpResult] = useState(false);
  const [resultText, setResultText] = useState("");

  function closeSignUpModal() {
    if (signUpResult) {
      setIsSignUpPopupOpen(false);
      setResultText("");
      history.push("/signin");
    } else {
      setIsSignUpPopupOpen(false);
      setResultText("");
    }
  }

  function handleSignUp(email, password) {
    auth
      .signUp(email, password)
      .then(() => {
        setSignUpResult(true);
        setResultText("Вы успешно зарегистрировались!");
        setIsSignUpPopupOpen(true);
      })
      .catch((err) => {
        setResultText("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSignUpPopupOpen(true);
        console.error(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getLoginInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/feed");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>

        <Route exact path="/signup">
          <Register
            handleSignUp={handleSignUp}
            signUpResult={signUpResult}
            isSignUpPopup
            Open={isSignUpPopupOpen}
            onClose={closeSignUpModal}
            resultText={resultText}
          />
        </Route>
        <ProtectedRoute
          path="/feed"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleSignOut={handleSignOut}
        />
        <Route path="/*">
          {loggedIn ? <Redirect to="/feed" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm name="confirm" title="Вы уверены?" />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        signUpResult={signUpResult}
        isOpen={isSignUpPopupOpen}
        onClose={closeSignUpModal}
        resultText={resultText}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
