import React, { useEffect } from "react";
import "./MyCards.css";
import useApi, { METHOD } from "../../hooks/useApi";

const DeleteCard = ({ isDisplay, setIsDisplay, card }) => {
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    useEffect(() => {
        if (document.getElementById("deleteContainer")) {
            const deleteContainer = document.getElementById("deleteContainer");

            if (isDisplay) {
                deleteContainer.style.display = "flex";
                setTimeout(() => {
                    deleteContainer.style.opacity = "1";
                    deleteContainer.style.top = "0";
                }, 1);
            }
        }
    }, [isDisplay]);
    return (
        <div id="deleteContainer">
            <div className="deleteContent bg-dark">
                <i
                    class="bi bi-trash3 text-danger"
                    style={{ fontSize: "2rem" }}
                ></i>
                <p className="text-danger">
                    Are you sure you want to delete this card?
                </p>
                <div className="btnDiv">
                    <button
                        className="btn btn-danger"
                        onClick={async () => {
                            await callApi(
                                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                                METHOD.DELETE_CARD,
                                card.bizNumber,
                                {
                                    "x-auth-token":
                                        localStorage.getItem("userPermissions"),
                                }
                            );
                            const deleteContainer =
                                document.getElementById("deleteContainer");
                            deleteContainer.style.top = "-50px";
                            deleteContainer.style.opacity = "0";

                            setTimeout(() => {
                                deleteContainer.style.display = "none";
                                /* window.location.reload(); */
                                setIsDisplay(false);
                            }, 1000);
                        }}
                    >
                        DELETE
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                            const deleteContainer =
                                document.getElementById("deleteContainer");
                            deleteContainer.style.top = "-50px";
                            deleteContainer.style.opacity = "0";

                            setTimeout(() => {
                                deleteContainer.style.display = "none";
                                setIsDisplay(false);
                            }, 1000);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCard;
