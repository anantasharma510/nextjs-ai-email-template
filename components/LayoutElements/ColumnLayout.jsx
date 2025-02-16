'use client'
import { useDragDropLayoutElement, useEmailTemplate, useSelectedElement } from '@/app/ConvexClientProvider';
import React, { useState } from 'react';
import ButtonComponent from '../custom/Element/ButtonComponent';
import TextComponent from '../custom/Element/TextComponent';
import ImageComponent from '../custom/Element/ImageComponent';
import LogoComponent from '../custom/Element/LogoComponent';
import DividerComponent from '../custom/Element/DividerComponent';
import SocialIconsComponent from '../custom/Element/SocialIconsComponent';
import { Trash } from 'lucide-react';

function ColumnLayout({ layout }) {
    const [dragOver, setDragOver] = useState();
    const { dragElementLayout } = useDragDropLayoutElement();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const {selectedElement, setSelectedElement} = useSelectedElement();

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
        if (element?.type === 'Button') { 
            return <ButtonComponent {...element} />;
        }else if (element?.type === 'Text') {
            return <TextComponent {...element} />
        }
        else if (element?.type === 'Image') {
            return <ImageComponent {...element} />
        }
        else if (element?.type === 'Logo') {
            return <LogoComponent {...element} />
        }
        else if (element?.type === 'Divider') {
            return <DividerComponent {...element} />
        }
        else if (element?.type === 'SocialIcons') {
            return <SocialIconsComponent {...element} />
        }
        return element?.type;
    
    };
    const deleteLayout=(layoutId)=>{
        const updatedEmailTemplate = emailTemplate?.filter(item => item?.id !== layoutId);
        setEmailTemplate(updatedEmailTemplate);
        setEmailTemplate(updatedEmailTemplate);
        setSelectedElement(null);
    }
    
    return (
        <div className='relative'>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout?.numOfCol || 1}, 1fr)`,
                    gap: '0px',
                }}
                className={`${selectedElement?.layout.id === layout?.id ? 'border border-dashed border-blue-500' : ''}`}

            >
                {Array.from({ length: layout?.numOfCol || 1 }).map((_, index) => (
          <div
          key={index}
          className={`
              ${!layout?.[index]?.type && 'bg-gray-100 p-0 cursor-pointer flex items-center justify-center border border-dashed'} 
              ${(index === dragOver?.index && dragOver?.columnId === layout?.id) && 'bg-green-100'}
              ${(selectedElement?.layout.id === layout?.id && selectedElement?.index === index) ? 'border-4 border-blue-900' : ''}
          `}
          onDragOver={(event) => onDragOverHandle(event, index)}
          onDrop={onDropHandle}
          onClick={() => setSelectedElement({ layout: layout, index: index })}
      >
          {GetElementComponent(layout?.[index]) ?? 'drag elements here'}
      </div>
      
                ))}
              {selectedElement?.layout.id === layout?.id &&  <div className='absolute  right-0
                -right-10 bg-gray-100 p-2 rounded-full cursor-pointer hover-scale-105 transition-all hoover:bg-gray-200
             
             
             '
             onClick={()=>deleteLayout(layout?.id)}
             
             
             >
                  <Trash className='h-4 w-4 text-red=500' />  
                </div>
}

            </div>
        </div>
    );
}

export default ColumnLayout;
