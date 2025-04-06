"use client";
import React, { useState } from "react";
import { ChatBubbleBottomCenterTextIcon, XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Mensaje enviado:", message);
      setMessage(""); // Limpiar el input después de enviar
    }
  };

  return (
    <div>
      {/* Floating Chat Button - Bottom Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-green-100 text-green-600 p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-green-100 focus:outline-none transition"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 bg-green-100 text-green-600 rounded-t-lg">
            <h2 className="text-lg font-medium">Chat with Us</h2>
            <button onClick={() => setIsOpen(false)} className="focus:outline-none">
              <XMarkIcon className="h-5 w-5 text-green-600" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 overflow-y-auto flex-1">
            <p className="text-gray-600">Hello! How can we assist you today?</p>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-300 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:border-green-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Enviar con "Enter"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-600 hover:text-green-100 focus:outline-none"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
