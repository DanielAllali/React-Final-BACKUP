import React, { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Logout = ({ display, setDisplay }) => {
    const navigate = useNavigate();
    const container = document.getElementById("container");
    useEffect(() => {
        if (container) {
            if (display) {
                container.style.display = "flex";
                setTimeout(() => {
                    container.style.opacity = "1";
                    container.style.top = "0";
                }, 1);
            } else {
                container.style.top = "-50px";
                container.style.opacity = "0";
                setTimeout(() => {
                    container.style.display = "none";
                }, 1000);
            }
        }
    }, [display]);
    return (
        <div className="logoutContainer" id="container">
            <div className="logoutContent bg-dark text-danger">
                <p>Are you sure you want to logout from this account?</p>
                <div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("userPermissions");
                            setDisplay(false);
                            navigate("/");
                            window.location.reload();
                        }}
                        className="btn btn-danger"
                    >
                        LOGOUT
                    </button>
                    <button
                        onClick={() => {
                            setDisplay(false);
                        }}
                        className="btn btn-outline-danger  "
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
