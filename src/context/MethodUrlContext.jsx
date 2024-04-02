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
  const [body, setBody] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState();
  const [message, setMessage] = useState();
  const [tokens, setTokens] = useState([]);
  const [aiRequest, setAiRequest] = useState('');

  const updateAiRequest = (newAiRequest) => {
    setAiRequest(newAiRequest);
  };

  const updateMethod = (newMethod) => {
      setMethod(newMethod);
  };

  const updateUrl = (newUrl) => {
      setUrl(newUrl);
  };

  const updateTokens = (newTokens = []) => {
    setTokens(newTokens);
};

  const updateParams = (newParams = []) => {
      setParams(newParams);
  };

  const updateBody = (newBody = '') => {
      setBody(newBody);
  };

  const updateHeaders = (newHeaders = []) => {
    setHeaders(newHeaders);
  };

    
  const flattenResponseData = (response) => {
    const flattenObject = (obj, parentKey = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const prefixedKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && key === 'data') {
                Object.assign(acc, flattenObject(obj[key], prefixedKey));
            } else {
                acc[prefixedKey] = obj[key];
            }
            return acc;
        }, {});
    };

    return flattenObject(response);
};


    const handleSubmit = async () => {
        if (url === '') {
            setMessage('Enter a URL')
            return;
        }
        try {
            const parsedBody = body ? JSON.parse(body) : null;
            const response = await axios({
                method: method,
                url: url,
                params: params.reduce((acc, param) => {
                    acc[param.name] = param.value;
                    return acc;
                }, {}),
                headers: headers.reduce((acc, header) => {
                    acc[header.name] = header.value;
                    return acc;
                }, {}),
                tokens: tokens.reduce((acc, token) => {
                    acc[token.name] = token.value;
                    return acc;
                }, {}),
                data: parsedBody
            });

            const flattenedResponse = flattenResponseData(response);
            console.log('Response:', flattenedResponse);
            setResponse(flattenedResponse);
            setData(response.data.message ? response.data.message : response.data);
        } catch (error) {
            console.error('Error:', error);
            setResponse(error.response);
            setMessage(error.message);
        }
    };


  const value = {
      method,
      url,
      params,
      body,
      headers,
      tokens,
      updateMethod,
      updateUrl,
      updateParams,
      updateBody,
      updateHeaders,
      updateTokens,
      handleSubmit,
      data,
      response,
      message,
      aiRequest,
      updateAiRequest
  };

  return (
      <MethodUrlContext.Provider value={value}>
          {children}
      </MethodUrlContext.Provider>
  );
};
