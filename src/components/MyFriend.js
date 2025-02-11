import React, { useState } from 'react';
import '../styles/MyFriend.css';

const MyFriend = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'friend',
      text: 'Hello! How are you feeling today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate friend response
    setTimeout(() => {
      const friendResponse = {
        id: chatHistory.length + 2,
        sender: 'friend',
        text: getFriendResponse(message),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, friendResponse]);
    }, 1000);
  };

  const getFriendResponse = (userMessage) => {
    const responses = [
      "I understand how you feel. Would you like to talk more about it?",
      "That's interesting! Tell me more about your day.",
      "I'm here to listen and support you. What's on your mind?",
      "Remember, it's okay to feel this way. Would you like to try some relaxation exercises?",
      "You're doing great! Is there anything specific you'd like to discuss?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="my-friend">
      <div className="chat-container">
        <div className="chat-header">
          <img src="/assets/virtual-friend.png" alt="Virtual Friend" className="friend-avatar" />
          <div className="friend-info">
            <h2>Your Virtual Friend</h2>
            <p>Always here to listen and support</p>
          </div>
        </div>

        <div className="chat-messages">
          {chatHistory.map(message => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'friend-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="friend-features">
        <div className="feature-card">
          <h3>Daily Check-in</h3>
          <p>Share how you're feeling today</p>
          <button>Start Check-in</button>
        </div>
        <div className="feature-card">
          <h3>Mood Tracker</h3>
          <p>Track your emotional well-being</p>
          <button>View Mood History</button>
        </div>
        <div className="feature-card">
          <h3>Relaxation Exercises</h3>
          <p>Guided breathing and meditation</p>
          <button>Start Exercise</button>
        </div>
      </div>
    </div>
  );
};

export default MyFriend;
