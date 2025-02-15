'use client'; // Make this file a Client Component

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState, useContext, createContext } from "react";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElement";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Create context
const UserDetailContext = createContext(null);

export default function ConvexClientProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [dragElementLayout, setDragElementLayout] = useState({});
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUserDetail = JSON.parse(localStorage.getItem('userDetail'));
        const storedEmailTemplate = JSON.parse(localStorage.getItem("emailTemplate"));
        setUserDetail(storedUserDetail ?? null);
        setEmailTemplate(storedEmailTemplate ?? []);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }
  }, []);

  // Save userDetail to localStorage whenever it changes
  useEffect(() => {
    if (userDetail !== null) {
      localStorage.setItem('userDetail', JSON.stringify(userDetail));
    }
  }, [userDetail]);

  // Save emailTemplate to localStorage whenever it changes
  useEffect(() => {
    if (emailTemplate !== null) {
      localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  useEffect(() => {
    if (selectedElement) {
      let updatedEmailTemplates = [];
      emailTemplate.forEach((item) => {
        if (item?.id === selectedElement?.layout?.id) {
          updatedEmailTemplates.push(selectedElement?.layout);
        } else {
          updatedEmailTemplates.push(item);
        }
      });
      setEmailTemplate(updatedEmailTemplates);
    }
  }, [selectedElement]);
  
  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }}>
              <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
              <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
  {children}
</SelectedElementContext.Provider>

             
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useUserDetailContext = () => useContext(UserDetailContext);
export const useScreenSize = () => useContext(ScreenSizeContext);
export const useDragDropLayoutElement = () => useContext(DragDropLayoutElement);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);
