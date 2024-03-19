import { useState } from "react";
import { Button } from "@mui/material";
import { useMethodUrlContext } from "../context/MethodUrlContext";

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
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Use HTTP verbs to make the request: ${inputText}. Give me only the request, do not say anything.`
                    }
                ],
                max_tokens: 100
            })
        }
    
        try {
            const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();
            updateAiRequest(data.choices[0].message);
        } catch (error) {
            console.error(error);
        }
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       message: `Use HTTP verbs to make the request: ${inputText}. Give me only the request, do not say anything.`
        //     }),
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        // };

        // try {
        //     const response = await fetch('http://54.207.142.190:5000/completions', options);
        //     const data = await response.json();
        //     console.log(data);
        //     updateAiRequest(data.choices[0].message);
        // } catch (error) {
        //     console.error(error);
        // }
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
