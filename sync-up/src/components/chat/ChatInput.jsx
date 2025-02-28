import { useState } from "react";
import { sendMessage } from "../lib/messages"; // Correct import path

const ChatInput = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const handleSendMessage = async () => {
        if (text || file) {
            await sendMessage(text, file);
            setText("");
            setFile(null);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Type a message..."
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatInput;
