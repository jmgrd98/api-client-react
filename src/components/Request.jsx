import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaCopy, FaCheck } from 'react-icons/fa';

function Request() {
    const [copied, setCopied] = useState(false);
    const [request, setRequest] = useState('Params');

    const handleCopy = () => {
          navigator.clipboard.writeText(JSON.stringify(request, null, 2));
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }

  return (
      <section className='border-2 border-gray-400 rounded-xl h-full p-5 w-1/2'>
      <p className='mb-5'>Request</p>
        <Box sx={{ minWidth: 120, maxWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        sx={{ backgroundColor: 'white' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={request}
                        label="Method"
                        onChange={(e) => setRequest(e.target.value)}
                    >
                        <MenuItem value={'Params'}>Params</MenuItem>
                        <MenuItem value={'Headers'}>Headers</MenuItem>
                        <MenuItem value={'Auth'}>Auth</MenuItem>
                        <MenuItem value={'Body'}>Body</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {request === 'Body' ? (
                <div className='mt-5 bg-gray-300 p-3 rounded-xl overflow-y-scroll max-h-[400px] relative'>
                <pre></pre>
                <button onClick={handleCopy} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2">
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
            </div>
                ) : null}

          
        </section>
  )
}

export default Request
