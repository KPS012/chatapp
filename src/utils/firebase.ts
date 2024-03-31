import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export const getChatHistory = async (username: string) => {
  const snapshot: firebase.database.DataSnapshot = await database.ref(`chatHistory/${username}`).once("value");
  return snapshot.val();
};

export const sendMessage = (username: string, message: string) => {
  database.ref(`chatHistory/${username}`).push({
    message,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
};

export const deleteMessage = (username: string, messageId: string) => {
  database.ref(`chatHistory/${username}/${messageId}`).remove();
};

export const getUserList = async () => {
  const snapshot: firebase.database.DataSnapshot = await database.ref('users').once("value");
  return snapshot.val();
};
