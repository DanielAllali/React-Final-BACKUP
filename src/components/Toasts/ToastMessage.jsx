import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ToastMessage.css";

const ToastMessage = ({ message, bgc = "bg-success" }) => {
    const toast = document.getElementById("toast");
    const [toastPos, setToastPos] = useState({
        right: "-300px",
    });
    const handleDisplay = () => {
        setToastPos({
            right: "100px",
        });
    };
    const handleUndisplay = () => {
        setToastPos({
            right: "-300px",
        });
    };
    useEffect(() => {
        setTimeout(handleDisplay, 100);
        setTimeout(handleUndisplay, 5000);
    }, []);
    return (
        <div
            style={{ right: toastPos.right }}
            id="toast"
            className={`toastContainer ${bgc}`}
        >
            <h2 className="text-light">{message}</h2>
        </div>
    );
};

export default ToastMessage;
