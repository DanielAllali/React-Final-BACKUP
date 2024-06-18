import React, { useState } from "react";
import image from "./sign up.mp4";
import "./signupPopup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupPopup } from "../../BCardsSlice";

const SignupPopup = () => {
    const [isDisplay, setIsDisplay] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div
            className="signupPopupContainer"
            style={{ display: isDisplay ? "flex" : "none" }}
        >
            <video height="auto" autoPlay muted loop>
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1>SIGNUP now and open you'r business</h1>
            <button
                onClick={() => {
                    setIsDisplay(false);
                    dispatch(setSignupPopup());
                    navigate("/Signup");
                }}
            >
                SIGNUP
            </button>
            <h4
                onClick={() => {
                    dispatch(setSignupPopup());
                    setIsDisplay(false);
                }}
            >
                Mayber later..
            </h4>
        </div>
    );
};

export default SignupPopup;
