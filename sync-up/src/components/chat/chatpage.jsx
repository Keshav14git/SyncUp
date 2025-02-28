import { Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";
import Chat from "./Chat";
import Detail from "./Detail";
import "./ChatPage.css"; // You'll need to create this CSS file

const ChatPage = ({ user }) => {
  return (
    <div className="chat-container">
      <div className="sidebar">
        <UserInfo user={user} />
        <ChatList user={user} />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<div className="welcome-message">Select a chat or start a new conversation</div>} />
          <Route path="/:chatId" element={
            <>
              <Chat user={user} />
              <Detail />
            </>
          } />
        </Routes>
      </div>
    </div>
  );
};
ChatPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ChatPage;
