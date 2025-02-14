'use client';
import { useDragDropLayoutElement, useEmailTemplate, useScreenSize } from '@/app/ConvexClientProvider';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import React, { useState } from 'react';
import ColumnLayout from '../LayoutElements/ColumnLayout';

function Canvas() {
    const { screenSize } = useScreenSize('');
    const { dragElementLayout } = useDragDropLayoutElement();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
        console.log('Over..');
    };

    const onDropHandle = () => {
        setDragOver(false);
        console.log(dragElementLayout?.dragLayout);
        if (dragElementLayout?.dragLayout) {
            setEmailTemplate(prev => Array.isArray(prev) ? [...prev, dragElementLayout?.dragLayout] : [dragElementLayout?.dragLayout]);
        }
    };

    const getLayoutComponent = (layout) => {
      if (layout?.type === 'column') {
          return <ColumnLayout layout={layout} />;  // Pass `layout` as a prop
      }
      return null;
  };
  

    return (
        <div className='mt-20 flex justify-center'>
            <div
                className={`bg-white p-6 w-full ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-lg'} ${dragOver ? 'bg-purple-100' : ''}`}
                onDragOver={onDragOver}
                onDrop={onDropHandle}
            >
                {/* Content goes here */}
                {emailTemplate?.length > 0 && emailTemplate.map((layout, index) => (
                    <div key={index}>
                        {getLayoutComponent(layout)}
                    </div>
                ))}
                <h2 className='text-center p-4 bg-gray border border-dashed'>Add a layout here</h2>
            </div>
        </div>
    );
}

export default Canvas;
