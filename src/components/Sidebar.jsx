import { useState } from 'react';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { CiCirclePlus } from "react-icons/ci";
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
    <div className="left-0 p-5 w-1/5 bg-gray-700 text-white flex flex-col gap-3">
      <Button onClick={addNewRequest} variant='contained' className="flex items-center gap-5">
        <p>Add a new request</p>
        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
      </Button>

      {requests.map((request, index) => (
        <Button
          variant='contained'
          color={getColorByMethod(request.method)}
          key={index}
          onClick={() => updateInfo(request)}
        >
          {request.method}
        </Button>
      ))}
    </div>
  )
}

export default Sidebar;
