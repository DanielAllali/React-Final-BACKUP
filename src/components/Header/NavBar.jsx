import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setSearchedCards } from "../BCardsSlice";

const Nav = ({ setIsSearch, search, foundCards }) => {
    const [searchValue, setSearchValue] = useState(search.searchInput);
    const uiMode = useSelector((state) => state.bCards.uiMode);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        search.setSearchInput(e.target.value);
    };
    useEffect(() => {
        search.setSearchInput(searchValue);
    }, [searchValue]);
    return (
        <div>
            <nav
                className={`navbar navbar-expand-lg navbar-${uiModeColors.backgrounds.header} bg-${uiModeColors.backgrounds.header}`}
            >
                <div className="container-fluid">
                    <a
                        onClick={() => {
                            navigate("/");
                        }}
                        className="text-light navbar-brand fw-bold"
                        href="#"
                    >
                        <h1>BCard</h1>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo02"
                    >
                        <ul
                            style={{ fontSize: "0.8rem" }}
                            className="navbar-nav me-auto mb-2 mb-lg-0"
                        >
                            <li className="nav-item">
                                <a
                                    className="text-light nav-link active"
                                    aria-current="page"
                                    href="#"
                                    onClick={() => {
                                        navigate("/About");
                                    }}
                                >
                                    ABOUT
                                </a>
                            </li>
                            {userPerm && (
                                <div className="fDirecColumn922px">
                                    <li className="nav-item">
                                        <a
                                            className="text-light nav-link active"
                                            href="#"
                                            onClick={() => {
                                                navigate("/Favorites");
                                            }}
                                        >
                                            FAV CARDS
                                        </a>
                                    </li>
                                    {userPerm.isBusiness && (
                                        <div className="fDirecColumn922px">
                                            <li className="nav-item">
                                                <a
                                                    className="text-light nav-link active"
                                                    href="#"
                                                    onClick={() => {
                                                        navigate("/MyCards");
                                                    }}
                                                >
                                                    MY CARDS
                                                </a>
                                            </li>
                                            {userPerm.isAdmin && (
                                                <li className="nav-item">
                                                    <a
                                                        className="text-light nav-link active"
                                                        href="#"
                                                    >
                                                        SANDBOX
                                                    </a>
                                                </li>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ul>
                        <form
                            className="d-flex"
                            role="search"
                            style={{ marginLeft: "2vw" }}
                        >
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onFocus={() => {
                                    setIsSearch(true);
                                }}
                                onChange={(e) => {
                                    handleSearchChange(e);
                                }}
                                value={searchValue}
                            />
                            <button
                                className={`btn btn-outline-light`}
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setSearchedCards(foundCards));
                                    navigate("/Search");
                                }}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
