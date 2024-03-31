'use client';

// Login.tsx

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { getDatabase, ref, child, set } from 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default function Login() {
  const [username, setUsername] = useState('');

  const handleSignIn = async () => {
    if (username.trim() !== '') {
      // Sign in with Google
      await signIn('google');

      // Store username in the database
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      
      // Check if username exists in the database
      const usernameRef = child(usersRef, username);
      set(usernameRef, true);
    } else {
      alert('Please enter a username');
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
}