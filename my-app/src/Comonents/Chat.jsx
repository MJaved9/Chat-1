import "./chat.css";
import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker"; 

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [mentionUsers, setMentionUsers] = useState([]);
  const [showMentionList, setShowMentionList] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const likeSoundRef = React.createRef();
  const sendSoundRef = React.createRef();

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = {
      user: randomUser,
      text: message,
      likes: 0,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    sendSoundRef.current.play();
  };

  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
    likeSoundRef.current.play();
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setMessage(inputText);

    if (inputText.endsWith("@")) {
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
  };

  const handleMentionUser = (user) => {
    setMessage(message.slice(0, -1) + user + " ");
    setMentionUsers([]);
    setShowMentionList(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.user}:</span>
            <span className="text">{msg.text}</span>
            <button className="like-button" onClick={() => handleLike(index)}>
              Like ({msg.likes})
            </button>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </button>
        {showEmojiPicker && <EmojiPicker onSelectEmoji={handleEmojiClick} />}
        {showMentionList && (
          <div className="mention-list">
            {user_list.map((user) => (
              <div
                key={user}
                className="mention-user"
                onClick={() => handleMentionUser(user)}
              >
                {user}
              </div>
            ))}
          </div>
        )}
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      <audio ref={likeSoundRef} src="sounds/like.mp3" />
      <audio ref={sendSoundRef} src="sounds/send.mp3" />
    </div>
  );
};

export default Chat;
