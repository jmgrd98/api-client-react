'use client'
import { CiCirclePlus } from "react-icons/ci";

function Sidebar() {

  const addNewRequest = () => {
    console.log('ADD')
  }

  return (
    <div className=" left-0 p-5 w-1/5 bg-gray-700 text-white flex flex-col">
      <div className="flex items-center gap-5">
        <p>Add a new request</p>
        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}} onClick={addNewRequest}/>
      </div>
    </div>
  )
}

export default Sidebar
