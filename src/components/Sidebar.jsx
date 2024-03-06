import { useState } from 'react';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { CiCirclePlus } from "react-icons/ci";
import Button from '@mui/material/Button';

function Sidebar() {
  const { method } = useMethodUrlContext();
  const [requests, setRequests] = useState([]);

  const addNewRequest = () => {
    setRequests([...requests, { method: method }]);
  }

  return (
    <div className="left-0 p-5 w-1/5 bg-gray-700 text-white flex flex-col gap-3">
      <Button onClick={addNewRequest} variant='contained' className="flex items-center gap-5">
        <p>Add a new request</p>
        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
      </Button>

      {requests.map((request, index) => (
        <Button variant='outlined' key={index}>
          {request.method}
        </Button>
      ))}
    </div>
  )
}

export default Sidebar;
