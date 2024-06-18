import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi, { METHOD } from "../../hooks/useApi";
import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
quantum.register();

const Favorites = () => {
    const [favCards, setFavCards] = useState([]);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();

    const userLogedin = useSelector(
        (state) => state.bCards.userLogedin.payload
    );
    const navigate = useNavigate();

    useEffect(() => {
        callApi("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
    }, []);
    useEffect(() => {
        /* if the apiResponse is an array it means its the cards */
        if (Array.isArray(apiResponse)) {
            for (const card in apiResponse) {
                if (isLike(apiResponse[card])) {
                    const likedCards = apiResponse.filter((card) =>
                        isLike(card)
                    );
                    setFavCards(likedCards);
                }
            }
        }
    }, [apiResponse]);
    const handleLikeUnlike = async (card) => {
        await callApi(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
            METHOD.LIKE_UNLIKE_CARD,
            null,
            { "x-auth-token": localStorage.getItem("userPermissions") }
        );
        window.location.reload();
    };
    const isLike = (card) => {
        if (userLogedin) {
            for (const user in card.likes) {
                if (card.likes[user] == userLogedin._id) {
                    /* this card is likes */
                    return true;
                }
            }
            if (card.length == 0) {
                return "text-secondary";
            }
            /* this card isn't likes */
            return false;
        }
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
            <div className={`favDiv ${uiModeColors.text}`}>
                <h1>Favorites cards</h1>
                <p>Here you can find cards that you liked</p>
                <div className="favCards">
                    {favCards &&
                        favCards.map((business) => (
                            <div
                                className="card"
                                style={{
                                    backgroundColor:
                                        uiModeColors.backgrounds.cards,
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
                                        <div>
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    fontSize: "4rem",
                                                    color: "ccc",
                                                }}
                                                className={
                                                    isLike(business)
                                                        ? "text-danger"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    handleLikeUnlike(business);
                                                }}
                                            >
                                                &#x2665;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {favCards.length <= 0 && !isLoading && (
                        <div>No favorites cards</div>
                    )}
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
            <Footer />
        </div>
    );
};

export default Favorites;
