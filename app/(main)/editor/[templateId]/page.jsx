'use client'; // ✅ Add this at the top

import { useEmailTemplate, useUserDetailContext } from '@/app/ConvexClientProvider';
import Canvas from '@/components/custom/Canvas';
import EditorHeader from '@/components/custom/EditorHeader';
import ElementsSideBar from '@/components/custom/ElementsSideBar'; // ✅ Make sure this is correct
import { api } from '@/convex/_generated/api';
import Settings from '@/components/custom/Settings'; 
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

function Editor() {
  const { userDetail } = useUserDetailContext();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();  
  const [viewHTMLCode, setViewHTMLCode] = useState(null);
  const { templateId } = useParams();
  const convex = useConvex();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail && templateId) {
      GetTemplateData();
    }
  }, [userDetail, templateId]);

  const GetTemplateData = async () => {
    setLoading(true);
    try {
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tid: templateId,
        email: userDetail?.email,
      });

      if (result.error) {
        console.error("Error fetching template design:", result.error);
        // Optionally, you can set an error state here to show to the user
      } else {
        console.log(result);
        setEmailTemplate(result?.design);  // Set the design data to context
      }
    } catch (error) {
      console.error("Failed to fetch template:", error);
      // Handle error (e.g., show error message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EditorHeader
        viewHTMLCode={(v) => setViewHTMLCode(v)}  // Updated to directly set the viewHTMLCode
      />

      {loading ? (
        <div>
          <h2>Please wait...</h2>
        </div>
      ) : (
        <div className='grid grid-cols-5'>
          <ElementsSideBar />
          <div className='col-span-3 bg-gray-100'>
            <Canvas 
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)} 
            />
          </div>
          <Settings />
        </div>
      )}
    </div>
  );
}

export default Editor;
