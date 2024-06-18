import React, { useEffect } from "react";
import "./BusinessView.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useApi, { METHOD } from "../../hooks/useApi";
import "ldrs/ring"; /* library fot loading */
import { quantum } from "ldrs";
quantum.register();

const BusinessView = () => {
    const navigate = useNavigate();
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [cardErrors, isLoading, apiResponse, callApi] = useApi();
    const { cardId } = useParams();

    useEffect(() => {
        callApi(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
            METHOD.GET_ONE
        );
    }, []);
    return (
        <div>
            <Header />
            <button
                className={`returnBtn btn btn-${
                    uiModeColors.icon == "#fff" ? "dark" : "primary"
                }`}
                onClick={() => {
                    navigate("/");
                }}
            >
                <i class="bi bi-arrow-right"></i>
            </button>
            {apiResponse && (
                <div
                    className={`businessView text-light bg-${uiModeColors.backgrounds.header}`}
                >
                    <img
                        src={apiResponse.image.url}
                        alt={apiResponse.image.alt}
                    />
                    <div>
                        <h1>{apiResponse.title}</h1>
                        <h4>{apiResponse.subtitle}</h4>
                        <h6>Description: {apiResponse.description}</h6>
                        <ul>
                            <li>
                                <i class="bi bi-telephone"></i>
                                {apiResponse.phone}
                            </li>
                            <li>
                                <i class="bi bi-envelope"></i>
                                {apiResponse.email}
                            </li>
                            <li>
                                <a
                                    href={apiResponse.web}
                                    className="text-light"
                                >
                                    <i class="bi bi-browser-chrome"></i>
                                    {apiResponse.web && apiResponse.web}
                                    {!apiResponse.web && <h6>No website</h6>}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul className="addressUl">
                        <li>
                            <h1>Address:</h1>
                        </li>
                        {apiResponse.address.state && (
                            <li>State: {apiResponse.address.state}</li>
                        )}
                        {apiResponse.address.country && (
                            <li>Country: {apiResponse.address.country}</li>
                        )}
                        {apiResponse.address.city && (
                            <li>City: {apiResponse.address.city}</li>
                        )}
                        {apiResponse.address.street && (
                            <li>Street: {apiResponse.address.street}</li>
                        )}
                        {apiResponse.address.houseNumber && (
                            <li>
                                House Number: {apiResponse.address.houseNumber}
                            </li>
                        )}
                        {apiResponse.address.zip && (
                            <li>Zip: {apiResponse.address.zip}</li>
                        )}
                    </ul>
                </div>
            )}
            {isLoading && (
                <div
                    className={uiModeColors.text}
                    style={{
                        marginTop: "100px",
                        width: "100vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <l-quantum
                        size="90"
                        speed="1.75"
                        color={uiModeColors.icon}
                    ></l-quantum>
                </div>
            )}
            {cardErrors && <h1 className={uiModeColors.text}>{cardErrors}</h1>}
            <Footer />
        </div>
    );
};

export default BusinessView;
