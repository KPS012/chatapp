"use client"

import { SessionProvider, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { firebaseConfig } from '@/components/firebaseConfig'; // Adjust the path as per your directory structure


import { Inter } from "next/font/google";
import "./globals.css";
import Login from "../components/Login";
import Home from "./page"; // Assuming this is where your Home component is located

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<any>(null); // Adjust the type as per your session data structure

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  // Initialize Firebase if session is available
  useEffect(() => {
    if (session) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [session]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <Home />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}