
import React, {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { BrowserRouter } from "react-router-dom";
import Api from "../utils/api";


function App() {

  const [cards, setCards] = useState([]);

  useEffect(() => {

    // check if jwt token is on local storage
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return
    }

    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const response = await Api.getCards()
      setCards(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await Api.getUserInfo();
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    try{
      const response = await Api.postCard(e.target['popup3__name'].value, e.target['popup3__about'].value);
      setCards([response, ...cards]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCard = async (event) => {
    try {
      const cardId = event.target.getAttribute('data-card-id');
      await Api.deleteCard(cardId);
      setCards(cards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.log(error);
    }
  }

  const handleLikeCard = async (event) => {
    const imgElement = event.target;
    const cardId = event.target.getAttribute('data-card-id');
    const userId = event.target.getAttribute('data-user-id');

    if (imgElement.src.includes("heart_black")) {
      try {

        await Api.deleteLike(cardId);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try{

        await Api.putLike(cardId);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCard();

    const newCards = cards.map(card => {
      if(card !== cardId){
        return card
      }
      return {...card, likes: card.likes.filter(like => {
          return like._id !== userId
        })}
    })
    setCards(newCards);
  }

  const [isLogin, setIsLogin] = useState(true);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const contextValue = {
    cards,
    currentUser,
    setCurrentUser,
    handleSubmitCard,
    handleDeleteCard,
    handleLikeCard,
    isLogin,
    setIsLogin,
    loggedInStatus,
    setLoggedInStatus
  }

  return (
  <>
    <CurrentUserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </CurrentUserContext.Provider>
    <Footer />
  </>
  );
}

export default App;
