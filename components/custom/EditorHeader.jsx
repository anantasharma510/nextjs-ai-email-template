'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useScreenSize } from '@/app/ConvexClientProvider';


function EditorHeader() {
    const { screenSize, setScreenSize } = useScreenSize('')
    
    return (
        <div className='p-2 shadow-sm flex items-center justify-between'>
            <Image src="/logo/logo.png" width={40} height={50} alt="logo" />
            <div className='gap-3'>
                <Button variant='ghost' 
                onClick={()=>setScreenSize('desktop')}
                className={`${screenSize === 'desktop' && 'text-primary'}`}>
                    <Monitor /> Desktop
                </Button>
                <Button 
                onClick={()=>setScreenSize('mobile')}
                variant='ghost' className={`${screenSize === 'mobile' && 'text-primary'}`}>
                    <Smartphone /> Mobile
                </Button>
            </div>
            
            <div className='flex gap-3'>
                <Button variant='ghost' className='hover:text-primary'>
                    <Code />
                </Button>
                <Button variant="outline">Send Test Email</Button>
                <Button>Save Template</Button>
            </div>
        </div>
    )
}

export default EditorHeader
