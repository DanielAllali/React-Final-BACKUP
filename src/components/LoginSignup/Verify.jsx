import React from "react";

const Verify = {
    Between_2_to_256_Required: (v) => {
        if (v != "" && v.length >= 2 && v.length <= 256) {
            return false;
        } else {
            return "Field must be between 2-256 characters";
        }
    },
    Between_2_to_256: (v) => {
        if (v == "" || (v.length >= 2 && v.length <= 256)) {
            return false;
        } else {
            return "Field must be between 2-256 or 0 characters";
        }
    },
    Phone: (v) => {
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(v)) {
            return false;
        } else {
            return "Invalid phone number";
        }
    },
    Email: (v) => {
        const emailRegex = /^(?=.{5,})^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(v)) {
            return false;
        } else {
            return "Invalid email";
        }
    },
    Password: (v) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*_\-&^%$#@!]).{8,}$/;
        if (passwordRegex.test(v)) {
            return false;
        } else {
            return "Password must have atleast 8 characters one capital and one small letter four numbers and *_-*&^%$#@!";
        }
    },
    ImageUrl: (v) => {
        const imageUrl =
            /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]+)?(\/.*)?$/;
        if (v.length >= 14 && imageUrl.test(v)) {
            return false;
        } else {
            return "ULR must be atleast 14 characters and a valid URL";
        }
    },
};

export default Verify;
