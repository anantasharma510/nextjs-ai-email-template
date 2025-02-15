'use client';
import React, { useState, useEffect } from 'react'; 
import InputField from './Settings/InputField';
import { useSelectedElement } from '@/app/ConvexClientProvider';
import ColorPickerField from './Settings/ColorPickerField';
import InputStyleField from './Settings/InputStyleField';
import { Textarea } from '../ui/textarea';
import ToggleGroupField from './Settings/ToogleGroupField';
import { AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseSensitive, CaseUpper } from 'lucide-react';
import DropDownField from './Settings/DropDownField';
const TextAlignOptions =[
  {
    value: 'left',
    icon:AlignLeft
  },
  {
    value: 'center',
    icon:AlignCenter
  },
  {
    value: 'right',
    icon:AlignRight
  }
]
const TextTransformOptions =[
  {
    value: 'uppercase',
    icon: CaseUpper
  },

  {
    value: 'lowercase',
    icon: CaseSensitive
  },
  {
    value: 'capitalize',
    icon: AArrowUp
  }

]
function Settings() {
   const { selectedElement, setSelectedElement } = useSelectedElement();
   const [element, setElement] = useState(null);

   useEffect(() => {
     if (selectedElement?.layout && selectedElement?.index !== undefined) {
       setElement(selectedElement.layout[selectedElement.index]);
     }
   }, [selectedElement]);

   const handleInputChange = (fieldName, value) => {
     if (!selectedElement || selectedElement.index === undefined) return;

     const updatedData = { ...selectedElement };
     updatedData.layout[selectedElement.index][fieldName] = value;

     setSelectedElement(updatedData);
   };

   const onHandleStyleChange = (fieldName, fieldValue) => {
     if (!selectedElement || selectedElement.index === undefined) return;

     const updatedElement = {
       ...selectedElement,
       layout: {
         ...selectedElement.layout,
         [selectedElement.index]: {
           ...selectedElement.layout[selectedElement.index],
           style: {
             ...selectedElement.layout[selectedElement.index].style,
             [fieldName]: fieldValue
           }
         }
       }
     };

     setSelectedElement(updatedElement);
   };

   return (
     <div className="p-5 flex flex-col gap-3">
       <h2 className="font-bold text-xl text-primary mt-6">Settings</h2>

       {element?.content && 
         <InputField 
           label="Content" 
           value={element.content} 
           onHandleInputChange={(value) => handleInputChange('content', value)} 
         />
       }

       {element?.textarea && 
         <div>
           <label>Textarea</label>
           <Textarea 
             value={element.textarea} 
             onChange={(e) => handleInputChange('textarea', e.target.value)} 
           />
         </div>
       }

       {element?.url && 
         <InputField 
           label="URL" 
           value={element.url} 
           onHandleInputChange={(value) => handleInputChange('url', value)} 
         />
       }

       {element?.style?.backgroundColor &&
         <ColorPickerField 
           label="Background Color"
           value={element.style.backgroundColor}
           onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)}
         />
       }

       {element?.style?.color &&
         <ColorPickerField 
           label="Text Color"
           value={element.style.color}
           onHandleStyleChange={(value) => onHandleStyleChange('color', value)}
         />
       }

       {element?.style?.fontSize &&
         <InputStyleField
           label="Font Size"
           value={element.style.fontSize}
           onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)}
         />
       }

       {element?.style?.padding &&
         <InputStyleField
           label="Padding"
           value={element.style.padding}
           type="px"
           onHandleStyleChange={(value) => onHandleStyleChange('padding', value)}
         />
       }

       {element?.style?.borderRadius &&
         <InputStyleField
           label="Border Radius"
           value={element.style.borderRadius}
           type="px"
           onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)}
         />
       }

       {element?.style?.width &&
         <InputStyleField
           label="Width"
           value={element.style.width} 
           type="%"
           onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
         />
       }

       {
        element?.style?.textAlign &&
        <ToggleGroupField
        label="Text Align"
        value={element.style.textAlign}
        options={TextAlignOptions}
        onHandleStyleChange={(value) => onHandleStyleChange('textAlign', value)}
        />
       }
         {
        element?.style?.textTransform &&
        <ToggleGroupField
        label="Text Transform"
        value={element.style.textTransform}
        options={TextTransformOptions}
        onHandleStyleChange={(value) => onHandleStyleChange('textTransform', value)}
        />
       }
       {element?.style?.fontWeight&&
         <DropDownField
           label="Font Weight"
           value={element.style.wfontWeight} 
           options={['normal', 'bold', 'bolder', 'lighter']}
          
           onHandleStyleChange={(value) => onHandleStyleChange('fontWeight', value)}
         />
       }
     </div>
   );
}

export default Settings;
