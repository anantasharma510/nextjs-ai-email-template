import { Slider } from '@/components/ui/slider';
import React from 'react';

function SliderField({ label, value, onHandleStyleChange , type='px'}) {
    const  FormattedValue =(value_)=>{
        return Number (value_.toString().replace(type,''));
    }
 
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Slider defaultValue={[FormattedValue(value)]} max={100} step={1}
      onValueStyleChange= {(v)=>onHandleStyleChange(v+type)}

       />

    </div>
  );
}

export default SliderField;
