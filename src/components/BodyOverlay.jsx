import React from "react";
import { useSelector } from "react-redux";

const BodyOverlay = () => {
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor:
            uiModeColors &&
            uiModeColors.backgrounds &&
            uiModeColors.backgrounds.body
                ? uiModeColors.backgrounds.body
                : "#535353",
        zIndex: -1,
        pointerEvents: "none",
    };

    return <div style={overlayStyle}></div>;
};

export default BodyOverlay;
