'use client'
import { useDragDropLayoutElement, useEmailTemplate } from '@/app/ConvexClientProvider';
import React, { useState } from 'react';

function ColumnLayout({ layout }) {
    const [dragOver, setDragOver] = useState();
    const { dragElementLayout } = useDragDropLayoutElement();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();

    const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id
        });
    };

    const onDropHandle = () => {
        const index = dragOver.index;
        setEmailTemplate(prevItem => 
            prevItem?.map(col => 
                col?.id === layout?.id ? 
                    { ...col, [index]: dragElementLayout?.dragElement } 
                    : col
            )
        );
        console.log(emailTemplate);
        setDragOver(null);
    };

    const GetElementComponent = (element) => {
        console.log(element);
        return element?.type;
    };

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout?.numOfCol || 1}, 1fr)`,
                    gap: '0px',
                }}
            >
                {Array.from({ length: layout?.numOfCol || 1 }).map((_, index) => (
                    <div
                        key={index}
                        className={`bg-gray-100 p-2 flex items-center justify-center
                        border border-dashed ${(index === dragOver?.index && dragOver?.columnId === layout?.id) && 'bg-green-100'}`}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                    >
                       {GetElementComponent(layout?.[index]) ?? 'drag elements here'}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColumnLayout;
