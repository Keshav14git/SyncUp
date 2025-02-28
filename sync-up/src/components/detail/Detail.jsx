import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./Detail.css";

const Detail = () => {
  const [userData, setUserData] = useState({
    username: "",
    status: "hey there! I am using SyncUp.",
    avatarUrl: "./avatarP.png"
  });
  
  const [expandedSections, setExpandedSections] = useState({
    chatSettings: false,
    privacyHelp: false,
    sharedPhotos: true,
    sharedFiles: false
  });
  
  // Firebase is already initialized in Login.js
  const auth = getAuth();
  const db = getFirestore();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              username: data.username || "User",
              status: data.status || "hey there! I am using SyncUp.",
              avatarUrl: data.avatarUrl || "./avatarP.png"
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [auth.currentUser, db]);
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener in App.js will handle the redirect
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  const handleBlock = () => {
    // Implement block functionality here
    alert("Block functionality would be implemented here");
  };
  
  return (
    <div className='detail'>
      <div className="user">
        <img src={userData.avatarUrl} alt="" />
        <h2>{userData.username}</h2>
        <h3>{userData.status}</h3>
      </div>
      <div className="info">
        <div className="option">
          <div className="title" onClick={() => toggleSection('chatSettings')}>
            <span>Chat Settings</span>
            <img 
              src={expandedSections.chatSettings ? "./arrowdown.png" : "./arrowup.png"} 
              alt="" 
            />
          </div>
          {expandedSections.chatSettings && (
            <div className="settings-content">
              {/* Chat settings content would go here */}
              <p>No settings available</p>
            </div>
          )}
        </div>
        
        <div className="option">
          <div className="title" onClick={() => toggleSection('privacyHelp')}>
            <span>Privacy & help</span>
            <img 
              src={expandedSections.privacyHelp ? "./arrowdown.png" : "./arrowup.png"} 
              alt="" 
            />
          </div>
          {expandedSections.privacyHelp && (
            <div className="help-content">
              {/* Privacy & help content would go here */}
              <p>Need help? Contact support@syncup.com</p>
            </div>
          )}
        </div>
        
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedPhotos')}>
            <span>Shared Photos</span>
            <img 
              src={expandedSections.sharedPhotos ? "./arrowdown.png" : "./arrowup.png"} 
              alt="" 
            />
          </div>
          
          {expandedSections.sharedPhotos && (
            <div className="photos">
              <div className="photoitem">
                <div className="photodetail">
                  <img src="./ss.png" alt="" />
                  <span>ss01_2025.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoitem">
                <div className="photodetail">
                  <img src="./ss2.png" alt="" />
                  <span>ss02_2025.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoitem">
                <div className="photodetail">
                  <img src="./ss3.png" alt="" />
                  <span>ss03_2025.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoitem">
                <div className="photodetail">
                  <img src="./ss4.png" alt="" />
                  <span>ss04_2025.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
            </div>
          )}
        </div>
        
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedFiles')}>
            <span>Shared Files</span>
            <img 
              src={expandedSections.sharedFiles ? "./arrowdown.png" : "./arrowup.png"} 
              alt="" 
            />
          </div>
          {expandedSections.sharedFiles && (
            <div className="files-content">
              {/* Shared files content would go here */}
              <p>No shared files</p>
            </div>
          )}
        </div>
        
        <button id="edit" onClick={handleBlock}>Block</button>
        <button id="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Detail;