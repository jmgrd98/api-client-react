import React, { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { toast, ToastContainer } from 'react-toastify';

function Header() {
  const { method, updateMethod, url, updateUrl, aiRequest, handleSubmit } = useMethodUrlContext();
//   const [httpVerb, setHttpVerb] = useState('');
//   const [endpoint, setEndpoint] = useState('');

  const { httpVerb, endpoint } = useMemo(() => {
    let method = '';
    let endpoint = '';

    if (aiRequest && aiRequest.content) {
        const lines = aiRequest.content.split('\n');
        if (lines.length > 0) {
            const firstLine = lines[0].trim();
            const [parsedMethod, parsedEndpoint] = firstLine.split(' ');
            if (parsedMethod && parsedEndpoint) {
                method = parsedMethod;
                endpoint = parsedEndpoint;
            }
        }
    }

    return { method, endpoint };
}, [aiRequest]);


  const validateAndSubmit = () => {
    if (url === '') {
      toast.error('Enter a URL');
      return;
    }
    handleSubmit();
  }

  const handleMethodChange = (e) => {
    updateMethod(e.target.value);
  };

  const handleUrlChange = (e) => {
    updateUrl(e.target.value);
  };

  return (
    <>
      <div className="flex items-center w-full gap-5 top-0 p-5 h-1/6 border-b bg-[#646165] border-gray-400 text-white">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              sx={{ backgroundColor: 'white' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={httpVerb || method} // Use httpVerb if available, otherwise use method
              label="Method"
              onChange={(e) => handleMethodChange(e)}
            >
              <MenuItem value={'GET'}>GET</MenuItem>
              <MenuItem value={'POST'}>POST</MenuItem>
              <MenuItem value={'PUT'}>PUT</MenuItem>
              <MenuItem value={'PATCH'}>PATCH</MenuItem>
              <MenuItem value={'DELETE'}>DELETE</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <input
          className='w-full p-3 rounded-xl text-black border border-gray-400'
          type='text'
          value={endpoint || url} // Use endpoint if available, otherwise use url
          onChange={(e) => handleUrlChange(e)}
          placeholder="http://localhost:3000/"
        />
        <Button variant="contained" onClick={validateAndSubmit}>Send</Button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Header;
