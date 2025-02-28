import "./Chat.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";


const Chat = () => {
 const [open,setOpen] = useState(false);
  const [text,setText] = useState('');

  

  

  const handleEmoji = e => {
    setText(prev=> prev+e.emoji);
  setOpen(false);};
    

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatarP.png" alt="" />
          <div className="texts">
            <span>Piyush</span>
            <p>Online</p>
          </div>
        </div>
        <div className="icons">
          <img src="./video.png" alt="" />
          <img src="./call.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatarP.png" alt="" />
          <div className="texts">
          <p>Hey, did you push the latest changes to Git?</p>
          <span>10:00 AM</span>      
          </div>
        </div>
        <div className="message own">
          <div className="texts">
          <p>Not yet, still fixing a small bug in the WebSocket connection.</p>
          <span>10:01 AM</span>      
          </div>
        </div>
        <div className="message">
          <img src="./avatarP.png" alt="" />
          <div className="texts">
          <p>Bro, the chat messages are duplicating 😭.</p>
          <span>10:01 AM</span>      
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="./ss.png" alt="" />
          <p>Wait, did you add useEffect without a dependency array?</p>
          <span>10:02 AM</span>      
          </div>
        </div>
        <div className="message">
          <img src="./avatarP.png" alt="" />
          <div className="texts">
          <p>Why is the UI breaking on mobile?</p>
          <span>10:02 AM</span>      
          </div>
        </div>
        <div className="message own">
          <div className="texts">
          <p>Check if overflow: hidden is messing with it</p>
          <span>10:03 AM</span>      
          </div>
        </div>
        
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./attachment.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message" value={text}
        onChange={e=>setText(e.target.value)}/>

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={()=>setOpen(prev=>!prev)} />
          <div className="picker">
          <EmojiPicker open = {open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button id="sendbutton">Send</button>
      </div>
    </div>
  )
}

export default Chat;