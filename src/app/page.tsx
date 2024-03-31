"use client"


import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Header from "@/components/Header";

interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: string;
}

export default function Home() {
  const session = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (session?.data?.user?.name) {
      const db = firebase.database();
      const chatRef = db.ref("chat/" + session.data.user.name);
      chatRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        } else {
          setMessages([]);
        }
      });
    }
  }, [session]);

  const handleDeleteMessage = (messageId: string) => {
    if (session?.data?.user?.name) {
      const db = firebase.database();
      const chatRef = db.ref("chat/" + session.data.user.name + "/" + messageId);
      chatRef.remove();
    }
  };

  return (
    <>
      {/* <div>{session?.data?.user?.name}</div> */}
      <div><Header /></div>
      <button onClick={() => signOut()}>Logout</button>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.text}</p>
            <p>Sent at: {new Date(message.timestamp).toLocaleString()}</p>
            {session?.data?.user?.name === message.sender && (
              <button onClick={() => handleDeleteMessage(message.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
