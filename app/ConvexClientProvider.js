

'use client'; // Make this file a Client Component

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState, useContext, createContext } from "react";
import { Underdog } from "next/font/google";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Create context
const UserDetailContext = createContext(null);

export default function ConvexClientProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [dragElementLayout, setDragElementLayout] = useState({});
  const [emailTemplate,setEmailTemplate]= useState({});

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
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider value={{dragElementLayout, setDragElementLayout}}>
              <EmailTemplateContext.Provider value={{emailTemplate,setEmailTemplate}}>
              {children}
              </EmailTemplateContext.Provider>
              </DragDropLayoutElement.Provider>

           
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useUserDetailContext = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
export const useDragDropLayoutElement = () => {
  return useContext(DragDropLayoutElement);
};
export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};