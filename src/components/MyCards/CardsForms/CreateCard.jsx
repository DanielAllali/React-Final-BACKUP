import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import Verify from "./Verify";
import useApi, { METHOD } from "../../../hooks/useApi";
import { disapearToast, displayToast } from "../../BCardsSlice";

const CreateCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [
        cardErrors,
        isLoading,
        apiResponse,
        callApi,
        statusCode,
        setStatusCode,
    ] = useApi();
    const [isFormValid, setIsFormValid] = useState(false);
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [fields, setFields] = useState({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
    });
    const [errors, setErrors] = useState({
        title: Verify(true, 2, 256, fields.title, "Field"),
        subtitle: Verify(true, 2, 256, fields.subtitle, "Subtitle"),
        description: Verify(true, 2, 1024, fields.description, "Description"),
        phone: Verify(true, 9, 11, fields.phone, "Phone"),
        email: Verify(true, 5, false, fields.email, "Email"),
        web: Verify(false, 14, false, fields.web, "url"),
        imageUrl: Verify(false, 14, false, fields.imageUrl, "url"),
        imageAlt: Verify(false, 2, 256, fields.imageAlt, "Image alt"),
        state: false,
        country: Verify(true, false, false, fields.country, "Country"),
        city: Verify(true, false, false, fields.city, "City"),
        street: Verify(true, false, false, fields.street, "Street"),
        houseNumber: Verify(true, 1, false, fields.houseNumber, "House Number"),
        zip: false,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFields = {
            ...fields,
            [name]: value,
        };
        setFields(updatedFields);
        resetErrors(updatedFields);
    };
    const resetFields = () => {
        const resetField = {};
        for (const key in fields) {
            resetField[key] = "";
        }
        setFields(resetField);
        resetErrors(resetField);
    };
    const handleSubmit = () => {
        dispatch(disapearToast());
        const payload = {
            title: fields.title,
            subtitle: fields.subtitle,
            description: fields.description,
            phone: fields.phone,
            email: fields.email,
            web: fields.web,
            image: {
                url: fields.imageUrl,
                alt: fields.imageAlt,
            },
            address: {
                state: fields.state,
                country: fields.country,
                city: fields.city,
                street: fields.street,
                houseNumber: fields.houseNumber,
                zip: fields.zip,
            },
        };
        const headers = {
            "x-auth-token": localStorage.getItem("userPermissions"),
        };
        callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
            METHOD.CREATE_CARD,
            payload,
            headers
        );
    };
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            dispatch(disapearToast());
            dispatch(
                displayToast({
                    message: "Card created successfuly",
                    bgc: "bg-success",
                })
            );
            setTimeout(() => {
                dispatch(disapearToast());
            }, 7100);
            navigate("/MyCards");
        } else if (statusCode == 400) {
            dispatch(disapearToast());
            dispatch(
                displayToast({
                    message: "Card with that email already exists",
                    bgc: "bg-danger",
                })
            );
        } else if (statusCode !== false) {
            dispatch(disapearToast());
            dispatch(
                displayToast({ message: "Error occurred", bgc: "bg-danger" })
            );
        }
    }, [statusCode]);
    const resetErrors = (fieldsArg) => {
        setErrors({
            title: Verify(true, 2, 256, fieldsArg.title, "Field"),
            subtitle: Verify(true, 2, 256, fieldsArg.subtitle, "Subtitle"),
            description: Verify(
                true,
                2,
                1024,
                fieldsArg.description,
                "Description"
            ),
            phone: Verify(true, 9, 11, fieldsArg.phone, "Phone"),
            email: Verify(true, 5, false, fieldsArg.email, "Email"),
            web: Verify(false, 14, false, fieldsArg.web, "url"),
            imageUrl: Verify(false, 14, false, fieldsArg.imageUrl, "url"),
            imageAlt: Verify(false, 2, 256, fieldsArg.imageAlt, "Image alt"),
            state: false,
            country: Verify(true, false, false, fieldsArg.country, "Country"),
            city: Verify(true, false, false, fieldsArg.city, "City"),
            street: Verify(true, false, false, fieldsArg.street, "Street"),
            houseNumber: Verify(
                true,
                1,
                false,
                fieldsArg.houseNumber,
                "House Number"
            ),
            zip: false,
        });
    };
    useEffect(() => {
        for (const error in errors) {
            if (errors[error]) {
                /* fields not valid */
                setIsFormValid(false);
                return;
            }
        }
        /* fields valid */
        setIsFormValid(true);
    }, [errors]);
    return (
        <div>
            <div
                onClick={() => {
                    dispatch(disapearToast());
                }}
            >
                <Header />
            </div>
            <div className="createCardDiv">
                <h1 className={uiModeColors.text}>Create Card</h1>
                <form
                    className="createCardFrom"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title*"
                                        minLength="2"
                                        maxLength="256"
                                        required
                                        value={fields.title}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.title && <h3>{errors.title}</h3>}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subtitle"
                                        placeholder="Subtitle*"
                                        minLength="2"
                                        maxLength="256"
                                        required
                                        value={fields.subtitle}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.subtitle && (
                                        <h3>{errors.subtitle}</h3>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Description*"
                                        minLength="2"
                                        maxLength="1024"
                                        required
                                        value={fields.description}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.description && (
                                        <h3>{errors.description}</h3>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone*"
                                        minLength="9"
                                        maxLength="11"
                                        required
                                        value={fields.phone}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.phone && <h3>{errors.phone}</h3>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email*"
                                        minLength="5"
                                        required
                                        value={fields.email}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.email && <h3>{errors.email}</h3>}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="web"
                                        placeholder="Web"
                                        minLength="14"
                                        value={fields.web}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.web && <h3>{errors.web}</h3>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        placeholder="Image URL"
                                        minLength="14"
                                        value={fields.imageUrl}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.imageUrl && (
                                        <h3>{errors.imageUrl}</h3>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="imageAlt"
                                        placeholder="Image Alt"
                                        minLength="2"
                                        maxLength="256"
                                        value={fields.imageAlt}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.imageAlt && (
                                        <h3>{errors.imageAlt}</h3>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={fields.state}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.state && <h3>{errors.state}</h3>}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country*"
                                        required
                                        value={fields.country}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.country && (
                                        <h3>{errors.country}</h3>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City*"
                                        required
                                        value={fields.city}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.city && <h3>{errors.city}</h3>}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street*"
                                        required
                                        value={fields.street}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.street && <h3>{errors.street}</h3>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="number"
                                        name="houseNumber"
                                        placeholder="House Number*"
                                        min="1"
                                        required
                                        value={fields.houseNumber}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.houseNumber && (
                                        <h3>{errors.houseNumber}</h3>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="zip"
                                        placeholder="Zip"
                                        value={fields.zip}
                                        onChange={handleChange}
                                        style={{
                                            border: `1px solid ${uiModeColors.inputBorder}`,
                                        }}
                                        className={uiModeColors.text}
                                    />
                                    {errors.zip && <h3>{errors.zip}</h3>}
                                </td>
                            </tr>
                            <tr>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        dispatch(disapearToast());
                                        navigate("/MyCards");
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={resetFields}
                                >
                                    <i className="bi bi-arrow-repeat"></i>
                                </button>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={!isFormValid}
                                    >
                                        Submit
                                    </button>
                                    {statusCode === 400 && (
                                        <h3>
                                            Card with that email already exists
                                        </h3>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div
                onClick={() => {
                    dispatch(disapearToast());
                }}
            >
                <Footer />
            </div>
        </div>
    );
};

export default CreateCard;
