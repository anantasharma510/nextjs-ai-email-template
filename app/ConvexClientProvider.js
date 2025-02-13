'use client'; // Make this file a Client Component

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState, useContext, createContext } from "react";
import { Underdog } from "next/font/google";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Create context
const UserDetailContext = createContext(null);

export default function ConvexClientProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storage = JSON.parse(localStorage.getItem('userDetail'));
        if (!storage || !storage.email) {
          // Redirect to home screen (implement your redirection logic here)
        } else {
          setUserDetail(storage);
        }
      } catch (error) {
        console.error("Error parsing userDetail from localStorage:", error);
      }
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          {children}
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useUserDetailContext = () => {
  return useContext(UserDetailContext);
};
