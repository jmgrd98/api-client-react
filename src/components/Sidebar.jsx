import { useState } from 'react';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { CiCirclePlus } from "react-icons/ci";
import { FaTimes } from 'react-icons/fa';
import Button from '@mui/material/Button';
import AiModal from './AiModal';

function Sidebar() {
  const { method, updateMethod, url, updateUrl, body, updateBody, headers, updateHeaders, params, updateParams } = useMethodUrlContext();
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addNewRequest = () => {
    setRequests([...requests, { method: method, url: url, body: body, headers: headers, params: params }]);
  }

  const updateInfo = (request) => {
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

  const handleClose = () => {
    setShowModal(false)
}

  return (
    <div className="left-0 p-5 w-1/5 bg-[#95A472] text-white flex flex-col gap-3">
      <Button onClick={addNewRequest} variant='contained' className="flex items-center gap-5">
        <p>Save request</p>
        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
      </Button>

    <div className='flex flex-col gap-3'>
      {requests.map((request, index) => (
        <div key={index} className="flex items-center gap-5">
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

      {/* <Button variant='contained' color='secondary' onClick={() => setShowModal(true)} >Use AI</Button> */}

        {showModal && <AiModal onClose={handleClose} />}
    </div>
  )
}

export default Sidebar;
