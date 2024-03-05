import { useState } from "react";
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useMethodUrlContext } from "../context/MethodUrlContext";

function Response() {

  const { method, updateMethod, url, updateUrl, data } = useMethodUrlContext();

  const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (data) {
          navigator.clipboard.writeText(JSON.stringify(data, null, 2));
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }
      };
  return (
    <section className='border-2 border-gray-400 rounded-xl h-full p-5 w-1/2'>
          <div className='flex items-center gap-3'>
            <p className="text-xl font-bold">Response</p>

          </div>

          {data.length > 0 && (
            <div className='mt-5 bg-gray-300 p-3 rounded-xl overflow-y-scroll max-h-[400px] relative'>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <button onClick={handleCopy} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2">
                {copied ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          )}
        </section>
  )
}

export default Response
