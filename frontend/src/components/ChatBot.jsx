import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiMessageSquare, FiSun, FiMoon } from 'react-icons/fi';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your health and wellness assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = 'AIzaSyChXdCRiqHLhTLdXYNICkXJS7YXavU0I44'; // Replace this with your real Gemini API key

  const systemPrompt = `You are a professional health and wellness assistant. Your knowledge is strictly limited to:
  - Physical health and fitness
  - Nutrition and dietetics
  - Mental health and wellbeing
  - Sleep science
  - Stress management techniques
  - General wellness practices

  You must follow these rules:
  1. For any question outside these domains, respond: "I specialize only in health and wellness topics. Please ask me about nutrition, exercise, mental health, or related subjects."
  2. Never provide medical diagnoses or treatment plans
  3. Always recommend consulting healthcare professionals for personal medical advice
  4. Provide evidence-based information from reputable sources
  5. Keep responses clear and concise`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const fullPrompt = `${systemPrompt}\n\nUser Question: ${input}\n\nAssistant Response:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.5,
            topP: 0.8,
            topK: 40
          }
        })
      });

      const data = await response.json();
      console.log(data);

      let botResponse = '';
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        botResponse = data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        botResponse = "I'm experiencing technical difficulties. Please try again later.";
      } else {
        botResponse = "I specialize only in health and wellness topics. Please ask me about nutrition, exercise, mental health, or related subjects.";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting to the service. Please try again later.",
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-white text-gray-800 border border-gray-200'
                }`}
            >
              {message.text.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-2">{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className={`max-w-3/4 rounded-lg p-3 ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800 border border-gray-200'}`}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about health, nutrition, fitness..."
            className={`flex-1 p-3 rounded-l-lg focus:outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500 border border-gray-300'}`}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className={`p-3 rounded-r-lg ${loading || !input.trim()
              ? darkMode
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : darkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
              } transition-colors`}
          >
            <FiSend />
          </button>
        </div>
        <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          I specialize in health and wellness topics only
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
