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

  const updateMethod = (newMethod) => {
      setMethod(newMethod);
  };

  const updateUrl = (newUrl) => {
      setUrl(newUrl);
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

  const handleSubmit = async () => {
      try {
          const parsedBody = body ? JSON.parse(body) : null;
          console.log(headers)
          const response = await axios({
              method: method,
              url: url,
              params: params,
              headers: {
                // 'X-RapidAPI-Key': headers.find(header => header.name === 'X-RapidAPI-Key').value,
                // 'X-RapidAPI-Host': headers.find(header => header.name === 'X-RapidAPI-Host').value
              },
              data: parsedBody
          });
          console.log('Response:', response);
          setResponse(response);
          setData(response.data.message ? response.data.message : response.data);
      } catch (error) {
          console.error('Error:', error);
      }
  };

  const value = {
      method,
      url,
      params,
      body,
      headers,
      updateMethod,
      updateUrl,
      updateParams,
      updateBody,
      updateHeaders,
      handleSubmit,
      data,
      response
  };

  return (
      <MethodUrlContext.Provider value={value}>
          {children}
      </MethodUrlContext.Provider>
  );
};
