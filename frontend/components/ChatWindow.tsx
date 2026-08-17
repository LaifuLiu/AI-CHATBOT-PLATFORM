"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";


type Message = {
  role: "user" | "assistant";
  content: string;
};


export default function ChatWindow() {

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you today?"
    }
  ]);


  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);


  async function sendMessage(message: string) {

    const userMessage: Message = {
      role: "user",
      content: message
    };


    setMessages(prev => [
      ...prev,
      userMessage
    ]);


    const response = await fetch(
      "http://localhost:8000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message
        })
      }
    );


    const data = await response.json();


    const assistantMessage: Message = {
      role: "assistant",
      content:
        data.answer ?? "No response"
    };


    setMessages(prev => [
      ...prev,
      assistantMessage
    ]);
  }


  return (

    <div className="flex h-full bg-gray-900 text-white">


      {/* Sidebar */}

      <aside
        className="
        w-64
        bg-gray-950
        p-4
        hidden
        md:block
        "
      >

        <button
          className="
          w-full
          rounded-lg
          bg-gray-800
          p-3
          hover:bg-gray-700
          "
        >
          + New Chat
        </button>


      </aside>



      {/* Chat area */}

      <section
        className="
        flex
        flex-1
        flex-col
        "
      >


        <div
          className="
          flex-1
          overflow-y-auto
          p-6
          space-y-4
          "
        >

          {
            messages.map(
              (msg,index)=>(

                <MessageBubble
                  key={index}
                  role={msg.role}
                  content={msg.content}
                />

              )
            )
          }


          <div ref={bottomRef}/>


        </div>



        <ChatInput
          onSend={sendMessage}
        />


      </section>


    </div>

  );
}