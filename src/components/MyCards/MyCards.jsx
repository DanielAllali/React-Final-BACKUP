import React, { useEffect, useState } from "react";
import "./MyCards.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi, { METHOD } from "../../hooks/useApi";

import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
import DeleteCard from "./DeleteCard.jsx";
quantum.register();

const MyCards = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState(null);
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    const [likedCards, setLikedCards] = useState({});

    const userLogedin = useSelector(
        (state) => state.bCards.userLogedin.payload
    );

    useEffect(() => {
        callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
            METHOD.GET_AUTH,
            null,
            { "x-auth-token": localStorage.getItem("userPermissions") }
        );
    }, []);
    useEffect(() => {
        /* if the apiResponse is an array it means its the cards */
        if (Array.isArray(apiResponse)) {
            setCards(apiResponse);
        }
    }, [apiResponse]);
    const handleLikeUnlike = async (card) => {
        await callApi(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
            METHOD.LIKE_UNLIKE_CARD,
            null,
            { "x-auth-token": localStorage.getItem("userPermissions") }
        );
        setLikedCards((prevLikedCards) => ({
            ...prevLikedCards,
            [card._id]: !prevLikedCards[card._id],
        }));
    };
    return (
        <div>
            <button
                className={`returnBtn btn btn-${
                    uiModeColors.icon == "#fff" ? "dark" : "primary"
                }`}
                onClick={() => {
                    navigate("/");
                }}
            >
                <i class="bi bi-arrow-right"></i>
            </button>
            <Header />
            <div className={`myCardsDiv ${uiModeColors.text}`}>
                <h1>My cards</h1>
                <p>Here you can find your cards</p>
                {isLoading && (
                    <div
                        class="d-flex flex-row align-items-center justify-content-center"
                        style={{ width: "100vw" }}
                    >
                        <l-quantum
                            size="90"
                            speed="1.75"
                            color={uiModeColors.icon}
                        ></l-quantum>
                    </div>
                )}
                {cardErrors && (
                    <h1 className={uiModeColors.text}>{cardErrors}</h1>
                )}
                <div className="myCards">
                    {cards && (
                        <button
                            onClick={() => {
                                navigate("/MyCards/Create");
                            }}
                            className="createCardBtn btn btn-outline-secondary"
                        >
                            <i class="bi bi-plus"></i>
                        </button>
                    )}
                    {cards &&
                        cards.map((card) => (
                            <div
                                key={card._id}
                                className="card"
                                style={{
                                    backgroundColor:
                                        uiModeColors.backgrounds.cards,
                                }}
                            >
                                <img
                                    src={card.image.url}
                                    alt={card.image.alt}
                                    onClick={() => {
                                        navigate(`/View/${card._id}`);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                                <div style={{ color: uiModeColors.icon }}>
                                    <h1>{card.title}</h1>
                                    <p
                                        style={{
                                            color: uiModeColors.weekText,
                                        }}
                                    >
                                        {card.subtitle}
                                    </p>
                                    <hr />
                                    <h6>
                                        Phone: <span>{card.phone}</span>
                                    </h6>
                                    <h6>
                                        Address:
                                        <span>
                                            {` ${card.address.city} ${card.address.street} ${card.address.houseNumber}`}
                                        </span>
                                    </h6>
                                    <h6>
                                        Card Number:{" "}
                                        <span>{card.bizNumber}</span>
                                    </h6>
                                    <table>
                                        <tr>
                                            <button
                                                className={uiModeColors.text}
                                                onClick={() => {
                                                    setIsDeletePopup(true);
                                                    setSelectedDeleteCard(card);
                                                }}
                                            >
                                                <i class="bi bi-trash3"></i>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/MyCards/Edit/${card._id}`
                                                    );
                                                }}
                                                className={uiModeColors.text}
                                            >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </tr>
                                        <tr>
                                            <button
                                                className={`heartIcon ${
                                                    likedCards[card._id]
                                                        ? "text-danger"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    handleLikeUnlike(card);
                                                }}
                                            >
                                                <i className="bi bi-heart-fill"></i>
                                            </button>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {isDeletePopup && (
                <DeleteCard
                    isDisplay={isDeletePopup}
                    setIsDisplay={setIsDeletePopup}
                    card={selectedDeleteCard}
                />
            )}
            <Footer />
        </div>
    );
};

export default MyCards;
