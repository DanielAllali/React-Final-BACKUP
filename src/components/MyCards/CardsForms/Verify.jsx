const Verify = (required, min, max, value, field) => {
    if (field == "Phone") {
        const phoneRegex =
            /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
        if (phoneRegex.test(value)) {
            return false;
        } else {
            return "isn't valid israeli phone number";
        }
    }
    if (field == "Email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            return false;
        } else {
            return "Isn't valid email";
        }
    }
    if (field == "url") {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (urlRegex.test(value) || value == "") {
            return false;
        } else {
            return "Isn't valid URL";
        }
    }
    if (required) {
        if (max && min) {
            if (value.length >= min && value.length <= max && value != "") {
                return false;
            } else {
                return `${field} must have between ${min}-${max} characters `;
            }
        } else if (!max && min) {
            if (value.length >= min && value != "") {
                return false;
            } else {
                return `${field} must have atleast ${min} characters `;
            }
        } else if (!max && !min) {
            if (value != "") {
                return false;
            } else {
                return `${field} can't be empty `;
            }
        }
    }
    if (!required) {
        if (max && min) {
            if ((value.length >= min && value.length <= max) || value == "") {
                return false;
            } else {
                return `${field} must have between ${min}-${max} or 0 characters `;
            }
        } else if (!max && min) {
            if (value.length >= min || value == "") {
                return false;
            } else {
                return `${field} must have atleast ${max} characters or 0 `;
            }
        }
    }
};

export default Verify;
