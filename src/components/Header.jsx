import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { toast, ToastContainer } from 'react-toastify';

function Header() {
    const { method, updateMethod, url, updateUrl, response, handleSubmit, } = useMethodUrlContext();

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
                        value={method}
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
                value={url}
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
