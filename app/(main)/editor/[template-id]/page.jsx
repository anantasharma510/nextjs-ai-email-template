'use client'; // ✅ Add this at the top

import Canvas from '@/components/custom/Canvas';
import EditorHeader from '@/components/custom/EditorHeader';
import ElementsSideBar from '@/components/custom/ElementsSideBar'; // ✅ Make sure this is correct

import Settings from '@/components/custom/Settings'; 

import React from 'react';

function Editor() {
  return (
    <div>
      <EditorHeader />
      <div className='grid grid-cols-5'>
        <ElementsSideBar />
        <div className='col-span-3 bg-gray-100'>
          <Canvas />
        </div>
       
    <Settings />
      </div>
    </div>
  );
}

export default Editor;
