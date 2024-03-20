import { useState } from "react";
import { Button } from "@mui/material";
import { useMethodUrlContext } from "../context/MethodUrlContext";
import { environment } from '../../environment';
import axios from "axios";

function AiModal({ onClose }) {
    const { updateAiRequest } = useMethodUrlContext();
    const [message, setMessage] = useState('');

    function handleOverlayClick(e) {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    }

    const handleAIGPT = async () => {
        const inputText = document.getElementById('textInput').value;
        const requestData = {
            message: `Use HTTP verbs to make the request: ${inputText}. Give me only the request, do not say anything.`
        };
        
        try {
            const response = await axios.post('http://54.207.142.190:5000/completions', requestData, {
                headers: {
                    'Authorization': `Bearer ${environment.openAIApiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            updateAiRequest(response.data.choices[0].message);
        } catch (error) {
            console.error(error);
        }
        onClose();
    };
    

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center modal-overlay"
                onClick={handleOverlayClick}
            ></div>

            <div
                className="fixed min-w-[500px] z-20 flex flex-col gap-5 p-5 items-center rounded bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <input 
                    id="textInput"
                    type='text' 
                    className='p-2 text-black border border-gray-400 rounded w-full' 
                    placeholder='Create a user with name, email and password on the body on endpoint localhost:3000/user' 
                />
                <Button variant='contained' color='secondary' onClick={handleAIGPT} >Generate</Button>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}

export default AiModal;
