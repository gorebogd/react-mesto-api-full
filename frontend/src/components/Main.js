import React from 'react';
import Card from './Card';
import Header from "./Header";
import Footer from "./Footer";


import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header page='feed' handleSignOut={props.handleSignOut} userData={props.userData} />
            <main className="main">
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                            <img className="profile__avatar"
                                src={currentUser.avatar}
                                alt="Аватар"
                            />
                        </div>
                        <div className="profile__block">
                            <div className="profile__info">
                                <h1 className="profile__title">{currentUser.name}</h1>
                                <button type="button" className="profile__edit-button"
                                        onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
                    </div>
                </section>
                <section className="cards">
                    <div className="cards__grid">{props.cards.map((item) => {
                        return (
                            <Card
                                card={item}
                                key={item._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                        );
                    })}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )

}

export default Main;