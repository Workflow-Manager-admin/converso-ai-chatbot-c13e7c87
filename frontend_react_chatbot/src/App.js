import React, { useRef, useEffect, useState } from 'react';
import './App.css';

/**
 * Main Chatbot App component.
 * Implements modern, minimalistic, and responsive chat UI.
 * - Branding header
 * - Centered chat container, fixed input at bottom
 * - Chat history (user + AI)
 * - Input box
 * - Loading indicator for AI response
 */
function App() {
  // State: all chat messages (each: {role: "user"|"ai", content: string})
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Hello! 👋 I am Converso, your AI chatbot. How can I help you today?',
    },
  ]);
  // Current user input
  const [input, setInput] = useState('');
  // "true" while waiting for AI response
  const [isLoading, setIsLoading] = useState(false);

  // For auto-scrolling chat to bottom
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message every render
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Simulates real-time AI reply after user sends message
  function handleSendMsg(e) {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    setMessages((msgs) => [...msgs, { role: "user", content: trimmedInput }]);
    setInput('');
    setIsLoading(true);

    // Simulate async AI response (replace this with backend/API for real bot)
    setTimeout(() => {
      const fakeReply = getFakeAIReply(trimmedInput);
      setMessages((msgs) => [...msgs, { role: "ai", content: fakeReply }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1200);
  }

  // Pressing Enter sends, shift-enter makes new line
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMsg(e);
    }
  }

  // --- Utility: produces 'AI' stub response
  function getFakeAIReply(userInput) {
    // For demonstration: echo/parse simple responses; replace for production
    if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
      return "Hi there! 😊 How can I help you?";
    }
    if (userInput.toLowerCase().includes('weather')) {
      return "I'm just a demo AI, but it's always sunny in the cloud!";
    }
    if (userInput.endsWith("?")) {
      return "That's a great question! Let me look into it for you. (This is a demo reply)";
    }
    // Fallback
    return `You said: "${userInput}". How else can I assist?`;
  }

  // --- Render ---

  return (
    <div className="chatbot-root">
      <header className="chatbot-header">
        <span className="chatbot-logo" aria-label="logo">🤖</span>
        <span className="chatbot-title">Converso AI</span>
        <span className="chatbot-brand-accent"></span>
      </header>
      <main className="chatbot-main">
        <div className="chatbot-chat-container">
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
              />
            ))}
            {isLoading && (
              <div className="chatbot-msg chatbot-msg-ai">
                <div className="chatbot-ai-bubble">
                  <LoadingIndicator />
                </div>
              </div>
            )}
            <span ref={chatEndRef} />
          </div>
          <form
            className="chatbot-input-bar"
            onSubmit={handleSendMsg}
            autoComplete="off"
          >
            <textarea
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              maxLength={2048}
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              tabIndex={0}
            >
              <span>Send</span>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M2 16L16 9L2 2V7L12 9L2 11V16Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>
      </main>
      <footer className="chatbot-footer">
        <small>Powered by <span className="chatbot-brand">Converso AI</span></small>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function ChatMessage({ role, content }) {
  // "ai" or "user"
  const isAI = role === 'ai';
  return (
    <div className={`chatbot-msg ${isAI ? 'chatbot-msg-ai' : 'chatbot-msg-user'}`}>
      <div className={isAI ? "chatbot-ai-bubble" : "chatbot-user-bubble"}>
        {content}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function LoadingIndicator() {
  // Simple animated typing dots
  return (
    <span className="chatbot-loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
}

export default App;
