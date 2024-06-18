import React, { useState, useEffect } from "react";
import "./Footer.css";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
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
    return (
        <div>
            <footer className={`bg-${uiModeColors.backgrounds.header}`}>
                <button
                    onClick={() => {
                        navigate("/About");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="white" /* {uiModeColors.icon} */
                        class="bi bi-exclamation-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg>
                    About
                </button>
                {userPerm && (
                    <div className="d-flex flex-row align-items-center justify-content-center gap-3">
                        <button
                            onClick={() => {
                                navigate("/Favorites");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white" /* {uiModeColors.icon} */
                                class="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                />
                            </svg>
                            Favorites
                        </button>
                        {userPerm.isBusiness && (
                            <button
                                onClick={() => {
                                    navigate("/MyCards");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="white" /* {uiModeColors.icon} */
                                    class="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path
                                        fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                    />
                                </svg>
                                My Cards
                            </button>
                        )}
                    </div>
                )}
            </footer>
        </div>
    );
};

export default Footer;
