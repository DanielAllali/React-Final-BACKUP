import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import Verify from "./Verify";
import useApi, { METHOD } from "../../hooks/useApi";
import { displayToast, disapearToast } from "../BCardsSlice";

const Signup = () => {
    const navigate = useNavigate();
    const [
        cardErrors,
        isLoading,
        apiResponse,
        callApi,
        statusCode,
        setStatusCode,
        url,
    ] = useApi();
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const dispatch = useDispatch();
    const [isFieldsValid, setIsFieldsValid] = useState(false);
    const [fields, setFields] = useState({
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Phone: "",
        Email: "",
        Password: "",
        ImageUrl: "",
        ImageAlt: "",
        State: "",
        Country: "",
        City: "",
        Street: "",
        HouseNumber: "",
        Zip: "",
        IsBusiness: false,
    });
    const [errors, setErrors] = useState({
        FirstName: Verify.Between_2_to_256_Required(fields.FirstName),
        MiddleName: Verify.Between_2_to_256(fields.MiddleName),
        LastName: Verify.Between_2_to_256_Required(fields.LastName),
        Phone: Verify.Phone(fields.Phone),
        Email: Verify.Email(fields.Email),
        Password: Verify.Password(fields.Password),
        ImageUrl: Verify.ImageUrl(fields.ImageUrl),
        ImageAlt: Verify.Between_2_to_256(fields.ImageAlt),
        State: Verify.Between_2_to_256(fields.State),
        Country: Verify.Between_2_to_256_Required(fields.Country),
        City: Verify.Between_2_to_256_Required(fields.City),
        Street: Verify.Between_2_to_256_Required(fields.Street),
        HouseNumber: Verify.Between_2_to_256_Required(fields.HouseNumber),
        Zip: Verify.Between_2_to_256_Required(fields.Zip),
    });
    const resetFields = () => {
        const resetField = {};
        for (const key in fields) {
            resetField[key] = "";
        }
        setFields(resetField);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedField = {
            ...fields,
            [name]: value,
        };
        setFields(updatedField);
        const updatedErrors = {
            FirstName: Verify.Between_2_to_256_Required(updatedField.FirstName),
            MiddleName: Verify.Between_2_to_256(updatedField.MiddleName),
            LastName: Verify.Between_2_to_256_Required(updatedField.LastName),
            Phone: Verify.Phone(updatedField.Phone),
            Email: Verify.Email(updatedField.Email),
            Password: Verify.Password(updatedField.Password),
            ImageUrl: Verify.ImageUrl(updatedField.ImageUrl),
            ImageAlt: Verify.Between_2_to_256(updatedField.ImageAlt),
            State: Verify.Between_2_to_256(updatedField.State),
            Country: Verify.Between_2_to_256_Required(updatedField.Country),
            City: Verify.Between_2_to_256_Required(updatedField.City),
            Street: Verify.Between_2_to_256_Required(updatedField.Street),
            HouseNumber: Verify.Between_2_to_256_Required(
                updatedField.HouseNumber
            ),
            Zip: Verify.Between_2_to_256_Required(updatedField.Zip),
        };
        setErrors(updatedErrors);
        for (const field in updatedErrors) {
            if (updatedErrors[field]) {
                /* FIELDS NOT VALID */
                setIsFieldsValid(false);
                return;
            }
        }
        /* FIELDS VALID */
        setIsFieldsValid(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
            METHOD.POST,
            {
                name: {
                    first: fields.FirstName,
                    middle: fields.MiddleName,
                    last: fields.LastName,
                },
                phone: fields.Phone,
                email: fields.Email,
                password: fields.Password,
                image: {
                    url: fields.ImageUrl,
                    alt: fields.ImageAlt,
                },
                address: {
                    state: fields.State,
                    country: fields.Country,
                    city: fields.City,
                    street: fields.Street,
                    houseNumber: fields.HouseNumber,
                    zip: fields.Zip,
                },
                isBusiness: fields.IsBusiness,
            }
        );
        const userPayload = {
            email: fields.Email,
            password: fields.Password,
        };
        /* lOGIN */
        await callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
            METHOD.POST,
            userPayload
        );
    };
    useEffect(() => {
        /* checks for login and not signup */
        if (
            (url ==
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login" &&
                typeof apiResponse == "string") ||
            (statusCode == 400 &&
                url ==
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login")
        ) {
            if (statusCode == 200 || statusCode == 201) {
                /* login successfuly */
                dispatch(disapearToast());
                dispatch(
                    displayToast({
                        message: "Login successfuly",
                        bgc: "bg-success",
                    })
                );
                localStorage.setItem("userPermissions", apiResponse);
                navigate("/");
            } else if (statusCode == 400) {
                /* user with email alreay exist */
                dispatch(disapearToast());
                dispatch(
                    displayToast({
                        message: "User with that email already exists",
                        bgc: "bg-danger",
                    })
                );
            } else if (statusCode) {
                /* problem */
                dispatch(disapearToast());
                dispatch(
                    displayToast({
                        message: "Error occurred try again",
                        bgc: "bg-danger",
                    })
                );
            }
            setStatusCode(false);
            setTimeout(() => {
                setStatusCode(false);
                dispatch(disapearToast());
            }, 10000);
        }
    }, [statusCode, apiResponse]);
    return (
        <div>
            <Header />
            <div className="signupDiv">
                <h1 className={uiModeColors.text}>Register</h1>
                <form>
                    <table>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="firstNameInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="First Name*"
                                    id="firstNameInput"
                                    name="FirstName"
                                    value={fields.FirstName}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.FirstName && (
                                    <h3>{errors.FirstName}</h3>
                                )}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="middleNameInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    id="middleNameInput"
                                    name="MiddleName"
                                    value={fields.MiddleName}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.MiddleName && (
                                    <h3>{errors.MiddleName}</h3>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="lastNameInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    id="lastNameInput"
                                    name="LastName"
                                    placeholder="Last Name*"
                                    value={fields.LastName}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.LastName && <h3>{errors.LastName}</h3>}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="phoneInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Phone*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Phone*"
                                    id="phoneInput"
                                    name="Phone"
                                    value={fields.Phone}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Phone && <h3>{errors.Phone}</h3>}
                            </td>
                        </tr>
                        <tr className="mb-5">
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="emailInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Email*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Email*"
                                    id="emailInput"
                                    name="Email"
                                    value={fields.Email}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Email && <h3>{errors.Email}</h3>}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="passwordInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Password*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Password*"
                                    id="passwordInput"
                                    name="Password"
                                    value={fields.Password}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Password && <h3>{errors.Password}</h3>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="imageUrlInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    id="imageUrlInput"
                                    name="ImageUrl"
                                    value={fields.ImageUrl}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.ImageUrl && <h3>{errors.ImageUrl}</h3>}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="imageAlt"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Image alt
                                </label>
                                <input
                                    type="text"
                                    id="imageAlt"
                                    name="ImageAlt"
                                    value={fields.ImageAlt}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.ImageAlt && <h3>{errors.ImageAlt}</h3>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="stateInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="stateInput"
                                    name="State"
                                    value={fields.State}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.State && <h3>{errors.State}</h3>}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="countryInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Country*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Country*"
                                    id="countryInput"
                                    name="Country"
                                    value={fields.Country}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Country && <h3>{errors.Country}</h3>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="cityInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    City*
                                </label>
                                <input
                                    type="text"
                                    placeholder="City*"
                                    id="cityInput"
                                    name="City"
                                    value={fields.City}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.City && <h3>{errors.City}</h3>}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="streetInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Street*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Street*"
                                    id="streetInput"
                                    name="Street"
                                    value={fields.Street}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Street && <h3>{errors.Street}</h3>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="houseNumberInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    House Number*
                                </label>
                                <input
                                    type="text"
                                    placeholder="House Number*"
                                    id="houseNumberInput"
                                    name="HouseNumber"
                                    value={fields.HouseNumber}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.HouseNumber && (
                                    <h3>{errors.HouseNumber}</h3>
                                )}
                            </td>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="zipInput"
                                    style={{
                                        backgroundColor:
                                            uiModeColors.backgrounds.body,
                                    }}
                                >
                                    Zip*
                                </label>
                                <input
                                    type="text"
                                    id="zipInput"
                                    name="Zip"
                                    placeholder="Zip*"
                                    value={fields.Zip}
                                    onChange={(e) => handleChange(e)}
                                    className={uiModeColors.text}
                                    style={{
                                        border: `1px solid ${uiModeColors.inputBorder}`,
                                    }}
                                />
                                {errors.Zip && <h3>{errors.Zip}</h3>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className={uiModeColors.text}
                                    htmlFor="isBuisenessInput"
                                >
                                    Signup as business
                                </label>
                                <input
                                    type="checkbox"
                                    id="isBuisenessInput"
                                    name="IsBusiness"
                                    onClick={() => {
                                        setFields({
                                            ...fields,
                                            IsBusiness: !fields.IsBusiness,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                    <div>
                        <Link to="/">
                            <button
                                type="button"
                                class="btn btn-outline-danger fw-bold"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            onClick={resetFields}
                            type="button"
                            class="btn btn-outline-success"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-arrow-repeat"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                <path
                                    fill-rule="evenodd"
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                                />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                        type="button"
                        class="btn btn-success"
                        disabled={!isFieldsValid}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
