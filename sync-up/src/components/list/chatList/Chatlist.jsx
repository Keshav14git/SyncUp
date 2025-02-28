import { useState } from "react";
import "./chatlist.css";

const Chatlist = () => {
    const [addMode,setAddMode] = useState(false);
  return (
    <div className='chatlist'>
        <div className='search'>
            <div className='searchbar'>
                <input type='text' placeholder='Search' />
            </div>
            <div className='add'>
            <img src={addMode ? "./minus.png" : "./plus.png"} alt='' onClick={() => setAddMode(prev => !prev)} />
            </div>
        </div>
        <div className="people">
            <img src="./avatarP.png" alt="" />
            <div className="texts">
            <span>Piyush</span>
            <p>.......</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarS.png" alt="" />
            <div className="texts">
            <span>Sujal</span>
            <p>.......</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>.......</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>........</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>.......</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>........</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>.......</p>
            </div>
        </div>
        <div className="people">
            <img src="./avatarA.png" alt="" />
            <div className="texts">
            <span>Ashwin</span>
            <p>.......</p>
            </div>
        </div>
    </div>
    
    
    
    
  )
}
export default Chatlist;