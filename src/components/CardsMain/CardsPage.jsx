import React, { useEffect, useState } from "react";
import "./CardsPage.css";
import buisenessImg from "./buisenessImg.jpg";
import { useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import useApi, { METHOD } from "../../hooks/useApi";
import { jwtDecode } from "jwt-decode";

import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
import { useNavigate } from "react-router-dom";
quantum.register();

const CardsPage = () => {
    const navigate = useNavigate();
    const userLogedin = useSelector(
        (state) => state.bCards.userLogedin.payload
    );
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    const [cards, setCards] = useState(null);
    const [likedCards, setLikedCards] = useState({});
    const [userPerm, setUserPerm] = useState(
        localStorage.getItem("userPermissions")
            ? jwtDecode(localStorage.getItem("userPermissions"))
            : null
    );
    useEffect(() => {
        setUserPerm(
            localStorage.getItem("userPermissions")
                ? jwtDecode(localStorage.getItem("userPermissions"))
                : null
        );
    }, [localStorage.getItem("userPermissions")]);
    useEffect(() => {
        callApi(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`);
    }, []);
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
    useEffect(() => {
        /* if the apiResponse is an array it means its the cards */
        if (Array.isArray(apiResponse)) {
            setCards(apiResponse);
        }
    }, [apiResponse]);
    return (
        <div className="container">
            <div className="cardsHeader">
                <h1 style={{ color: uiModeColors.normalText }}>Cards Page</h1>
                <p style={{ color: uiModeColors.weekText }}>
                    Here you can find businesses cards from all categories
                </p>
            </div>
            <div className="cardsDiv">
                {cards &&
                    cards.map((business) => (
                        <div
                            className="card"
                            style={{
                                backgroundColor: uiModeColors.backgrounds.cards,
                            }}
                        >
                            <img
                                src={business.image.url}
                                alt={business.image.alt}
                                onClick={() => {
                                    navigate(`/View/${business._id}`);
                                }}
                                style={{ cursor: "pointer" }}
                            />
                            <div style={{ color: uiModeColors.icon }}>
                                <h1>{business.title}</h1>
                                <p style={{ color: uiModeColors.weekText }}>
                                    {business.subtitle}
                                </p>
                                <hr />
                                <h6>
                                    Phone: <span>{business.phone}</span>
                                </h6>
                                <h6>
                                    Address:
                                    <span>
                                        {` ${business.address.city} ${business.address.street} ${business.address.houseNumber}`}
                                    </span>
                                </h6>
                                <h6>
                                    Card Number:{" "}
                                    <span>{business.bizNumber}</span>
                                </h6>
                                <div>
                                    {userPerm && userPerm.isAdmin && (
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill={uiModeColors.icon}
                                                className="bi bi-trash3-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    )}
                                    <div>
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill={uiModeColors.icon}
                                                className="bi bi-telephone-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                                />
                                            </svg>
                                        </button>
                                        {userPerm && (
                                            <button
                                                className={`heartIcon ${
                                                    likedCards[business._id]
                                                        ? "text-danger"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    handleLikeUnlike(business);
                                                }}
                                            >
                                                &#x2665;
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                {isLoading && (
                    <l-quantum
                        size="90"
                        speed="1.75"
                        color={uiModeColors.icon}
                    ></l-quantum>
                )}
                {cardErrors && (
                    <h1 className={uiModeColors.text}>{cardErrors}</h1>
                )}
            </div>
        </div>
    );
};

export default CardsPage;
