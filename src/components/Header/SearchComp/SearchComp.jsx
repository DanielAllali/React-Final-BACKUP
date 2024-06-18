import React, { useEffect, useState } from "react";
import "./SearchComp.css";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useApi, { METHOD } from "../../../hooks/useApi";

import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
quantum.register();

const SearchComp = () => {
    const searchedCards = useSelector((state) => state.bCards.searchedCards);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const uiMode = useSelector((state) => state.bCards.uiMode);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    const [likedCards, setLikedCards] = useState({});

    const userLogedin = useSelector(
        (state) => state.bCards.userLogedin.payload
    );
    const navigate = useNavigate();
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
            <Header />
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
            <div className="cardsFound">
                {searchedCards &&
                    searchedCards.map((card) => (
                        <div
                            className={`cardFound`}
                            style={{
                                backgroundColor: uiModeColors.backgrounds.cards,
                            }}
                        >
                            <img
                                onClick={() => {
                                    navigate(`/View/${card._id}`);
                                }}
                                src={card.image.url}
                                alt={card.image.alt}
                            />
                            <div className={uiModeColors.text}>
                                <h1>{card.title}</h1>
                                <p>{card.subtitle}</p>

                                <hr />
                                <h6>
                                    <span>Phone:</span>
                                    {card.phone}
                                </h6>
                                <h6>
                                    <span>Address:</span>
                                    {` ${card.address.city} ${card.address.street} ${card.address.houseNumber}`}
                                </h6>
                                <h6>
                                    <span>Card Number</span>
                                    {card.bizNumber}
                                </h6>
                            </div>
                            <div className="icons">
                                {userPerm && (
                                    <button
                                        className={
                                            likedCards[card._id]
                                                ? "text-danger"
                                                : ""
                                        }
                                        onClick={() => {
                                            handleLikeUnlike(card);
                                        }}
                                    >
                                        &#x2665;
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                {searchedCards && searchedCards.length <= 0 && !isLoading && (
                    <h1
                        className={uiModeColors.text}
                        style={{ fontSize: "2rem" }}
                    >
                        No cards found
                    </h1>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchComp;
