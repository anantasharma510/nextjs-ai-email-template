'use client';
import { useDragDropLayoutElement, useEmailTemplate, useScreenSize } from '@/app/ConvexClientProvider';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import React, { useRef, useState, useEffect } from 'react';
import ColumnLayout from '../LayoutElements/ColumnLayout';
import ViewHtmlDailog from './ViewHtmlDailog';

function Canvas({ viewHTMLCode, closeDialog, templateData }) {
    const htmlRef = useRef();
    const { screenSize } = useScreenSize('');
    const { dragElementLayout } = useDragDropLayoutElement();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');

    // Load templateData into emailTemplate when it changes
    useEffect(() => {
        if (templateData) {
            setEmailTemplate(templateData); // ✅ Set template data on load
        }
    }, [templateData]);

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDropHandle = () => {
        setDragOver(false);
        if (dragElementLayout?.dragLayout) {
            setEmailTemplate((prev) => Array.isArray(prev) ? [...prev, dragElementLayout.dragLayout] : [dragElementLayout.dragLayout]);
        }
    };

    const getLayoutComponent = (layout) => {
        if (layout?.type === 'column') {
            return <ColumnLayout layout={layout} />;
        }
        return null;
    };

    const GetHTMLCode = () => {
        if (htmlRef.current) {
            const htmlContent = htmlRef.current.innerHTML;
            setHtmlCode(htmlContent);
        }
    };

    useEffect(() => {
        if (viewHTMLCode) {
            GetHTMLCode();
        }
    }, [viewHTMLCode]);

    return (
        <div className='mt-20 flex justify-center'>
            <div
                className={`bg-white p-6 w-full ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-lg'} ${dragOver ? 'bg-purple-100' : ''}`}
                onDragOver={onDragOver}
                onDrop={onDropHandle}
                ref={htmlRef}
            >
                {/* ✅ Ensure emailTemplate is mapped correctly */}
                {emailTemplate?.length > 0 ? (
                    emailTemplate.map((layout, index) => (
                        <div key={index}>
                            {getLayoutComponent(layout)}
                        </div>
                    ))
                ) : (
                    <h2 className='text-center p-4 bg-gray border border-dashed'>Add a layout here</h2>
                )}
            </div>

            {/* View HTML Dialog */}
            <ViewHtmlDailog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog} />
        </div>
    );
}

export default Canvas;
