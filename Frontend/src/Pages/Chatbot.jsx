import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useFirebase } from '../Context/FirebaseContext';
import { initializeSocket } from '../socket';

const Chatbot = ({ socket: passedSocket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useFirebase();
  
  const [activeSocket, setActiveSocket] = useState(null);
  const internalSocketRef = useRef(null);

  useEffect(() => {
    setAvatar(user?.photoURL);
  }, [user]);

  // Handle socket initialization
  useEffect(() => {
    let intervalId;

    const setupSocket = async () => {
      if (passedSocket) {
        // If a ref is passed, check if it's already populated
        if (passedSocket.current) {
          setActiveSocket(passedSocket.current);
        } else {
          // Poll every 500ms until the parent component populates the ref
          intervalId = setInterval(() => {
            if (passedSocket.current) {
              setActiveSocket(passedSocket.current);
              clearInterval(intervalId);
            }
          }, 500);
        }
      } else if (!internalSocketRef.current) {
        // No socket passed, initialize an internal one
        const socket = await initializeSocket();
        internalSocketRef.current = socket;
        setActiveSocket(socket);
      }
    };

    setupSocket();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [passedSocket]);

  // Manage event listeners
  useEffect(() => {
    if (!activeSocket) return;

    const handleBotResponse = (response) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      setLoading(false);
    };

    activeSocket.on('botResponse', handleBotResponse);

    return () => {
      activeSocket.off('botResponse', handleBotResponse);
    };
  }, [activeSocket]);

  // Clean up internal socket on unmount
  useEffect(() => {
    return () => {
      if (internalSocketRef.current) {
        internalSocketRef.current.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!input.trim() || !activeSocket) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    activeSocket.emit('userMessage', userMessage);

    setInput('');
    setLoading(true);
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className="flex flex-col mb-4">
        {message.sender === 'user' ? (
          <div className="flex justify-end items-start gap-2">
            <div className="chat-bubble bg-primary text-primary-content max-w-[80%] rounded-2xl p-3">
              {message.text}
            </div>
            {avatar ? (
              <img src={avatar} alt="User" className="w-8 h-8 rounded-full border border-primary object-cover" />
            ) : (
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border border-primary shadow-sm select-none">
                  {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-start items-start gap-2">
            <img src="/bot.jpg" alt="Bot" className="w-8 h-8 rounded-full border border-secondary object-cover" />
            <div className="chat-bubble bg-base-200 text-base-content max-w-[80%] rounded-2xl p-3">
              {renderMarkdown(message.text)}
            </div>
          </div>
        )}
      </div>
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const language = className?.replace(/language-/, '') || '';
            return (
              <div className="relative my-2">
                <CopyToClipboard text={String(children)} onCopy={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}>
                  <button className="absolute right-2 top-2 z-10 p-1 bg-base-300 rounded hover:bg-base-100 text-xs">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter style={twilight} language={language} {...props} className="rounded-lg text-sm">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  // Determine if we are in the dashboard or in a modal
  const isDashboard = window.location.pathname.includes('/dashboard');

  return (
    <div className={`flex flex-col h-full w-full ${isDashboard ? 'lg:ml-64 pt-24 px-6 pb-6' : ''}`}>
      <div className="flex-grow overflow-y-auto p-4 bg-base-100 rounded-t-xl shadow-inner border border-base-300">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-50 select-none">
            <img src="/bot.jpg" alt="Bot" className="w-20 h-20 rounded-full mb-4 grayscale object-cover" />
            <p className="text-xl font-semibold">AI Assistant Ready</p>
            <p className="text-sm">Ask me anything about your code!</p>
          </div>
        )}
        {renderMessages()}
        {loading && (
          <div className="flex items-center gap-2 mt-2">
            <img src="/bot.jpg" alt="Bot" className="w-8 h-8 rounded-full animate-pulse border border-secondary object-cover" />
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-base-200 rounded-b-xl border-x border-b border-base-300 flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-grow focus:input-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI assistant..."
        />
        <button onClick={handleSendMessage} className="btn btn-primary px-6">Send</button>
      </div>
    </div>
  );
};

// Standalone AI chatbot page
export default Chatbot;
