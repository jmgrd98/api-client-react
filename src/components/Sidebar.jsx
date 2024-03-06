import { useState } from 'react';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { CiCirclePlus } from "react-icons/ci";
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon
import Button from '@mui/material/Button';

function Sidebar() {
  const { method, updateMethod, url, updateUrl, body, updateBody, headers, updateHeaders, params, updateParams } = useMethodUrlContext();
  const [requests, setRequests] = useState([]);

  const addNewRequest = () => {
    setRequests([...requests, { method: method, url: url, body: body, headers: headers, params: params }]);
  }

  const updateInfo = (request) => {
    console.log(request)
    updateMethod(request.method);
    updateUrl(request.url);
    updateBody(request.body);
  }

  const deleteRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const getColorByMethod = (requestMethod, url) => {
    let color = ''
    switch (requestMethod){
      case 'GET':
        color = 'primary'
        break;
      case 'POST':
        color = 'success'
        break;
      case 'PUT':
        color = 'secondary'
        break;
      case 'PATCH':
        color = 'secondary'
        break;
      case 'DELETE':
        color = 'error'
        break;
      default:
        color = 'primary'
        break;
    }
    return color;
  };

  return (
    <div className="left-0 p-5 w-1/5 bg-[#95A472] text-white flex flex-col gap-3">
      <Button onClick={addNewRequest} variant='contained' className="flex items-center gap-5">
        <p>Add a new request</p>
        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
      </Button>

      {requests.map((request, index) => (
        <div key={index} className="flex items-center justify-between">
          <Button
          sx={{ display: 'flex', alignItems: 'center', gap: 3, maxWidth: '150px'}}
            variant='contained'
            color={getColorByMethod(request.method)}
            onClick={() => updateInfo(request)}
          >
            <p>{request.method}</p>
            <FaTimes onClick={() => deleteRequest(index)} style={{ cursor: 'pointer' }} />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Sidebar;
