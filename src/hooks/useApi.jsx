import React, { useState } from "react";
import axios from "axios";

const useApi = () => {
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [statusCode, setStatusCode] = useState(false);
    const [url, setUrl] = useState(null);

    const callApi = async (
        url,
        method = METHOD.GET_ALL,
        payload,
        headers = {}
    ) => {
        setUrl(url);
        try {
            setIsLoading(true);
            let response;

            switch (method) {
                case METHOD.GET_ALL:
                    response = await axios.get(url);
                    break;
                case METHOD.GET_ONE:
                    response = await axios.get(url, payload);
                    break;
                case METHOD.POST:
                    response = await axios
                        .post(url, payload)
                        .then(function (res) {
                            setApiResponse(res.data ? res.data : res);
                            setStatusCode(res.status);
                            return;
                        })
                        .catch(function (err) {
                            if (err.response) {
                                setStatusCode(err.response.status);
                            }
                            setErrors(err);
                        });
                    break;
                case METHOD.GET_AUTH:
                    response = await axios.get(url, { headers });
                    break;
                case METHOD.CREATE_CARD:
                    axios
                        .post(url, payload, { headers })
                        .then(function (res) {
                            setApiResponse(res.data ? res.data : res);
                            setStatusCode(res.status);
                            return;
                        })
                        .catch(function (err) {
                            if (err.response) {
                                console.log(err);
                                setStatusCode(err.response.status);
                            }
                            setErrors(err);
                        });
                case METHOD.UPDATE_CARD:
                    response = await axios
                        .put(url, payload, { headers })
                        .then(function (res) {
                            setApiResponse(res.data ? res.data : res);
                            setStatusCode(res.status);
                            return;
                        })
                        .catch(function (err) {
                            if (err.response) {
                                setStatusCode(err.response.status);
                            }
                            setErrors(err);
                        });
                    break;
                case METHOD.DELETE_CARD:
                    response = await axios.delete(url, { headers }, payload);
                    break;
                case METHOD.LIKE_UNLIKE_CARD:
                    response = await axios.patch(url, null, { headers });
                    break;
            }
            setApiResponse(response.data);
        } catch (err) {
            setErrors(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [
        errors,
        isLoading,
        apiResponse,
        callApi,
        statusCode,
        setStatusCode,
        url,
    ];
};

export const METHOD = {
    GET_ALL: "GET_ALL",
    GET_ONE: "GET_ONE",
    POST: "POST",
    GET_AUTH: "GET_AUTH",
    CREATE_CARD: "CREATE_CARD",
    UPDATE_CARD: "UPDATE_CARD",
    DELETE_CARD: "DELETE_CARD",
    LIKE_UNLIKE_CARD: "LIKE_UNLIKE_CARD",
};

export default useApi;
