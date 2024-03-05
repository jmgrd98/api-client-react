import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const MethodUrlContext = createContext(null);

export const useMethodUrlContext = () => {
    const context = useContext(MethodUrlContext);
    if (!context) {
        throw new Error('useMethodUrlContext must be used within a MethodUrlProvider');
    }
    return context;
};

export const MethodUrlProvider = ({ children }) => {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [params, setParams] = useState([]);
    const [body, setBody] = useState({});
    const [data, setData] = useState([]);

    const updateMethod = (newMethod) => {
        setMethod(newMethod);
    };

    const updateUrl = (newUrl) => {
        setUrl(newUrl);
    };

    const updateParams = (newParams) => {
        setParams(newParams);
    };

    const updateBody = (newBody) => {
        setBody(newBody);
    };

    const handleSubmit = async () => {
        try {
          const parsedBody = JSON.parse(body); // Parse the string into an object
            console.log(parsedBody);
            const response = await axios({
                method: method,
                url: url,
                data: parsedBody
            });
            console.log('Response:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const value = {
        method,
        url,
        params,
        body,
        updateMethod,
        updateUrl,
        updateParams,
        updateBody,
        handleSubmit,
        data
    };

    return (
        <MethodUrlContext.Provider value={value}>
            {children}
        </MethodUrlContext.Provider>
    );
};
