'use client'; // Make this file a Client Component

import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Prompt from '@/Data/Prompt';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';
import { useUserDetailContext } from '@/app/ConvexClientProvider';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

function AiInputBox() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { userDetail } = useUserDetailContext();

  // Correctly reference the SaveTemplate function from the emailTemplate module
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);  // Adjusted here
const router = useRouter();
  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + userInput;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post('/api/ai-email-generate', {
        prompt: PROMPT,
        userEmail: userDetail?.email,  // Ensure user email is passed
        tId: tid,
      });
      console.log(result.data);

      // Save to the database with the description field
      const resp = await SaveTemplate({
        tid: tid,
        design: result.data,
        email: userDetail?.email,
        description: userInput,  // Include the description from user input
      });

      console.log(resp);

      // Optionally, navigate the user to the editor screen
     router.push(`/editor/${tid}`);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="mt-5">
      <p>Provide the details about the template and AI will generate</p>
      <Textarea
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Provide the details about the template and AI will generate"
        rows="5"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button
        disabled={userInput?.length === 0 || loading}
        onClick={OnGenerate}
        className="w-full mt-7  flex items-center justify-center"
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">🔄</span> Generating...
          </>
        ) : (
          "Generate Template"
        )}
      </Button>
    </div>
  );
}

export default AiInputBox;
