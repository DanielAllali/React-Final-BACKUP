import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uiMode: "light",
    uiModeColors: {
        text: "text-dark",
        normalText: "#000",
        weekText: "#777",
        icon: "#000",
        inputBorder: "rgba(11,94,215,0.3)",
        negativeColor: "dark",
        backgrounds: {
            header: "primary",
            cards: "#f8f9fa",
            body: "#E3F2FD",
        },
    },
    userLogedin: false,
    isToast: false,
    searchedCards: null,
    popups: {
        /* this object says that if a popup was already displayed stop displaying it */
        signup: false,
    },
};

const bcCardsSlice = createSlice({
    name: "bcCards",
    initialState,
    reducers: {
        toggleUiMode: (state) => {
            if (state.uiMode === "dark") {
                state.uiMode = "light";
                state.uiModeColors = {
                    text: "text-dark",
                    normalText: "#000",
                    weekText: "#777",
                    icon: "#000",
                    inputBorder: "rgba(11,94,215,0.3)",
                    negativeColor: "dark",
                    backgrounds: {
                        header: "primary",
                        cards: "#f8f9fa",
                        body: "#E3F2FD",
                    },
                };
            } else {
                state.uiMode = "dark";
                state.uiModeColors = {
                    text: "text-white",
                    normalText: "#eef4ed",
                    weekText: "#ccc",
                    icon: "#fff",
                    inputBorder: "rgba(255,255,255,0.3)",

                    negativeColor: "light",
                    backgrounds: {
                        header: "dark",
                        cards: "#000",
                        body: "#535353",
                    },
                };
            }
        },
        displayToast: (state, toastInfo) => {
            state.isToast = toastInfo.payload;
        },
        disapearToast: (state) => {
            state.isToast = false;
        },
        setUserLogedin: (state, user) => {
            state.userLogedin = user;
        },
        setSearchedCards: (state, cards) => {
            state.searchedCards = cards.payload;
        },
        setSignupPopup: (state) => {
            state.popups.signup = true;
        },
    },
});

export const {
    toggleUiMode,
    displayToast,
    disapearToast,
    setUserLogedin,
    setSearchedCards,
    setSignupPopup,
} = bcCardsSlice.actions;

export default bcCardsSlice.reducer;
