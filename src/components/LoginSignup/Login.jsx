import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Verify from "./Verify";
import { displayToast, disapearToast } from "../BCardsSlice";
import "bootstrap-icons/font/bootstrap-icons.css";
import useApi, { METHOD } from "../../hooks/useApi";

const Login = () => {
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
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [isFieldsValid, setIsFieldsValid] = useState(false);
    /* useEffect(() => {
        callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
            METHOD.GET_ALL_AUTH,
            null,
            {
                "x-auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck",
            }
        );
    }, []); */

    const [errors, setErrors] = useState({
        Email: Verify.Email(""),
        Password: Verify.Password(""),
    });
    const [fields, setFields] = useState({
        Email: "",
        Password: "",
    });
    const resetFields = () => {
        const newFields = {};
        for (const key in fields) {
            newFields[key] = "";
        }
        setFields(newFields);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: fields.Email,
            password: fields.Password,
        };
        callApi(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
            METHOD.POST,
            payload
        );
    };
    useEffect(() => {
        if (statusCode === 200) {
            localStorage.setItem("userPermissions", apiResponse);
            dispatch(
                displayToast({
                    message: "Login successfuly",
                    bgc: "bg-success",
                })
            );
            navigate("/");
        } else if (statusCode == 400) {
            dispatch(
                displayToast({
                    message: "Email or password uncorrect",
                    bgc: "bg-danger",
                })
            );
        }
        setTimeout(() => {
            dispatch(disapearToast());
            setStatusCode(false);
        }, 7100);
    }, [statusCode]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedField = {
            ...fields,
            [name]: value,
        };
        setFields(updatedField);
        const emailErr = Verify.Email(updatedField.Email);
        const passwordErr = Verify.Password(updatedField.Password);
        setErrors({
            Email: emailErr,
            Password: passwordErr,
        });
        if (!emailErr && !passwordErr) {
            /* fields valid */
            setIsFieldsValid(true);
            return;
        }
        /* fields unvalid */
        setIsFieldsValid(false);
    };
    return (
        <div>
            <Header />
            <div className="loginDiv">
                <svg
                    style={{ marginTop: "200px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill={uiModeColors.icon}
                    className="bi bi-lock-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
                <h1 className={uiModeColors.text}>Login</h1>
                <form>
                    <label
                        class={uiModeColors.text}
                        style={{
                            backgroundColor: uiModeColors.backgrounds.body,
                        }}
                        htmlFor="emailInput"
                    >
                        Email*
                    </label>
                    <input
                        id="emailInput"
                        name="Email"
                        value={fields.Email}
                        type="text"
                        onChange={(e) => handleChange(e)}
                        placeholder="Email*"
                        style={{
                            border: `1px solid ${uiModeColors.inputBorder}`,
                        }}
                        class={uiModeColors.text}
                    />
                    {errors.Email && <h3>{errors.Email}</h3>}
                    <label
                        class={uiModeColors.text}
                        style={{
                            backgroundColor: uiModeColors.backgrounds.body,
                        }}
                        htmlFor="passwordInput"
                    >
                        Password*
                    </label>
                    <input
                        id="passwordInput"
                        type={displayPassword ? "text" : "password"}
                        name="Password"
                        value={fields.Password}
                        onChange={(e) => handleChange(e)}
                        placeholder="Password"
                        style={{
                            border: `1px solid ${uiModeColors.inputBorder}`,
                        }}
                        class={uiModeColors.text}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setDisplayPassword(displayPassword ? false : true);
                        }}
                        className="showPassword"
                    >
                        <i
                            className={`bi bi-eye${
                                displayPassword ? "-slash" : ""
                            } ${uiModeColors.text}`}
                        ></i>
                    </button>
                    {errors.Password && <h3>{errors.Password}</h3>}
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
                                className="bi bi-arrow-repeat"
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
                        onClick={(e) => handleSubmit(e)}
                        type="button"
                        class="btn btn-success"
                        disabled={!isFieldsValid}
                    >
                        Submit
                    </button>
                    {statusCode == 400 && <h3>Email or password uncorrect</h3>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
