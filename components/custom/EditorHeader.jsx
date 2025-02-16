'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useScreenSize } from '@/app/ConvexClientProvider';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { useEmailTemplate } from '@/app/ConvexClientProvider';

function EditorHeader({ viewHTMLCode }) {
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();  
    const updateTemplate = useMutation(api.template.updateTemplate);
    const { templateId } = useParams();
    const [isTemplateIdValid, setIsTemplateIdValid] = useState(true); // For checking the templateId validity

    // Check if templateId exists and is valid
    useEffect(() => {
        if (!templateId) {
            setIsTemplateIdValid(false);
        }
    }, [templateId]);

    const onSaveTemplate = async () => {
        if (!isTemplateIdValid) {
            console.error('Template ID is invalid or missing.');
            return;
        }

        // Log emailTemplate to check its structure
        console.log('Email Template:', emailTemplate);

        // Sanitize the emailTemplate to avoid React internal fields
        const sanitizedEmailTemplate = { ...emailTemplate };
        delete sanitizedEmailTemplate.$$typeof; // remove any internal fields if they exist

        try {
            await updateTemplate({
                tid: templateId,
                design: sanitizedEmailTemplate
            });
            console.log('Template saved successfully!');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    const { screenSize, setScreenSize } = useScreenSize('');
    
    return (
        <div className='p-2 shadow-sm flex items-center justify-between'>
            <Image src="/logo/logo.png" width={40} height={50} alt="logo" />
            <div className='gap-3'>
                <Button 
                    variant='ghost' 
                    onClick={() => setScreenSize('desktop')}
                    className={`${screenSize === 'desktop' && 'text-primary'}`}
                >
                    <Monitor /> Desktop
                </Button>
                <Button 
                    variant='ghost' 
                    onClick={() => setScreenSize('mobile')}
                    className={`${screenSize === 'mobile' && 'text-primary'}`}
                >
                    <Smartphone /> Mobile
                </Button>
            </div>

            <div className='flex gap-3'>
                <Button 
                    variant='ghost' 
                    className='hover:text-primary'
                    onClick={() => {
                        viewHTMLCode(true);
                    }}
                >
                    <Code />
                </Button>
                <Button variant="outline">Send Test Email</Button>
                <Button onClick={onSaveTemplate}>Save Template</Button>
            </div>
        </div>
    );
}

export default EditorHeader;
