import { configureStore } from "@reduxjs/toolkit";
import BCardsSlice from "./components/BCardsSlice";

export default configureStore({
    reducer: {
        bCards: BCardsSlice,
    },
});
