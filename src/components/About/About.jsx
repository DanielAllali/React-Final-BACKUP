import React from "react";
import "./About.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
    const uiModeColors = useSelector((state) => state.bCards.uiModeColors);
    const navigate = useNavigate();
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
            <div className="aboutBody">
                <ul>
                    <li className={uiModeColors.text}>
                        <h1>Introduction</h1>
                        <p>
                            Welcome to BCard, your go-to platform for managing
                            and sharing business cards online. Our platform
                            provides a comprehensive solution to create, edit,
                            and organize your business cards effortlessly,
                            ensuring you always make a great impression.
                        </p>
                    </li>
                    <li className={uiModeColors.text}>
                        <h1>How to Use BCard</h1>
                        <ul>
                            <li>
                                <span>Sign Up and Login:</span> Create an
                                account by signing up with your email address.
                                If you already have an account, simply log in.
                            </li>
                            <li>
                                <span>Create a Business Card:</span> Navigate to
                                the 'Create Card' section, fill in your details,
                                and upload a profile picture. Save your card to
                                start using it.
                            </li>
                            <li>
                                <span>Edit Your Cards:</span> Go to 'My Cards'
                                to view and edit your existing cards. Make
                                changes as needed and save them.
                            </li>
                            <li>
                                <span>Share Your Card:</span> Choose the card
                                you want to share, select the sharing option,
                                and send it via email or post it on social
                                media.
                            </li>
                            <li>
                                <span>Organize Your Cards:</span> Use the
                                'Favorite Cards' page to categorize and tag your
                                contacts, making it easier to manage and find
                                them later.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default About;
