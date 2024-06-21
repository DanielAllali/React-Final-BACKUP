import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogedin, toggleUiMode } from "../BCardsSlice";
import ToastMessage from "../Toasts/ToastMessage";
import { jwtDecode } from "jwt-decode";
import useApi, { METHOD } from "../../hooks/useApi";
import Logout from "./Logout";
import SignupPopup from "../animations/signupPopup/SignupPopup.jsx";

import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
quantum.register();

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchedCards, setSearchedCards] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [isLogoutDiv, setIsLogoutDiv] = useState(false);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    const uiMode = useSelector((state) => state.bCards.uiMode);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const popups = useSelector((state) => state.bCards.popups);
    const userLogedin = useSelector(
        (state) => state.bCards.userLogedin.payload
    );
    const isToast = useSelector((state) => state.bCards.isToast);
    const [userPerm, setUserPerm] = useState(
        localStorage.getItem("userPermissions")
            ? jwtDecode(localStorage.getItem("userPermissions"))
            : null
    );
    const searchCards = async (query) => {
        await callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
        );
        if (Array.isArray(apiResponse)) {
            const cards = apiResponse;
            const filteredCards = cards.filter((card) =>
                card.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchedCards(filteredCards);
        }
    };
    useEffect(() => {
        searchCards(searchInput);
    }, [searchInput]);
    useEffect(() => {
        setUserPerm(
            localStorage.getItem("userPermissions")
                ? jwtDecode(localStorage.getItem("userPermissions"))
                : null
        );
    }, [localStorage.getItem("userPermissions")]);
    useEffect(() => {
        const headers = {
            "x-auth-token": localStorage.getItem("userPermissions"),
        };
        if (userPerm) {
            callApi(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userPerm._id}`,
                METHOD.GET_AUTH,
                null,
                headers
            );
        }
    }, []);
    useEffect(() => {
        /* checks that it exist and that it isnt the cards */
        if (apiResponse && !Array.isArray(apiResponse)) {
            dispatch(setUserLogedin(apiResponse));
        }
    }, [apiResponse]);
    return (
        <div>
            <header className={`bg-${uiModeColors.backgrounds.header}`}>
                {/* BOOTSTRAP navbar*/}
                <NavBar
                    setIsSearch={setIsSearch}
                    search={{
                        searchInput: searchInput,
                        setSearchInput: setSearchInput,
                    }}
                    foundCards={searchedCards}
                />
                {isToast && (
                    <ToastMessage bgc={isToast.bgc} message={isToast.message} />
                )}
                <div className="headerNotNavDiv">
                    <button
                        className="uiMode"
                        onClick={() => dispatch(toggleUiMode())}
                    >
                        {uiMode == "light" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="white"
                                className="bi bi-moon-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                            </svg>
                        )}
                        {uiMode == "dark" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="white"
                                className="bi bi-brightness-high"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                            </svg>
                        )}
                    </button>
                    {!userPerm && (
                        <div className="loginSignup">
                            <Link to="/Login">
                                <button
                                    type="button"
                                    class={`btn btn-${uiModeColors.backgrounds.header} text-light`}
                                >
                                    LOGIN
                                </button>
                            </Link>
                            <Link to="/Signup">
                                <button
                                    type="button"
                                    class={`btn btn-${uiModeColors.backgrounds.header} text-light`}
                                >
                                    SIGNUP
                                </button>
                            </Link>
                        </div>
                    )}
                    {!userPerm && !popups.signup && <SignupPopup />}
                    {userLogedin && (
                        <div
                            className="userDiv"
                            onClick={() => {
                                console.log("here");
                                setIsLogoutDiv(isLogoutDiv ? false : true);
                            }}
                        >
                            <h5>{userLogedin.name.first}</h5>
                            <img
                                src={
                                    userLogedin.image.url
                                        ? userLogedin.image.url
                                        : "./profileImg.png"
                                }
                                alt={
                                    userLogedin.image.alt
                                        ? userLogedin.image.alt
                                        : "profile"
                                }
                            />
                        </div>
                    )}
                </div>
            </header>
            {isSearch && (
                <div
                    className={`searchFoundCards bg-${uiModeColors.backgrounds.header}`}
                >
                    <button
                        className={`btn btn-danger`}
                        onClick={() => {
                            setIsSearch(isSearch ? false : true);
                        }}
                    >
                        X
                    </button>
                    <table>
                        {isLoading && (
                            <l-quantum
                                size="90"
                                speed="1.75"
                                color="white"
                            ></l-quantum>
                        )}
                        {searchedCards &&
                            searchedCards.map((card) => (
                                <tr>
                                    <td>
                                        <button
                                            className={`btn btn-${
                                                uiModeColors.backgrounds
                                                    .header == "dark"
                                                    ? "secondary"
                                                    : "light"
                                            }`}
                                            onClick={() => {
                                                navigate(`/View/${card._id}`);
                                            }}
                                        >
                                            <h1>{card.title}</h1>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {searchedCards &&
                            searchedCards.length <= 0 &&
                            !isLoading && (
                                <tr>
                                    <td>
                                        <h1
                                            className={
                                                uiMode == "dark"
                                                    ? "text-secondary"
                                                    : "text-light"
                                            }
                                            style={{ fontSize: "2rem" }}
                                        >
                                            No cards found
                                        </h1>
                                    </td>
                                </tr>
                            )}
                    </table>
                </div>
            )}
            <Logout display={isLogoutDiv} setDisplay={setIsLogoutDiv} />
        </div>
    );
};

export default Header;
