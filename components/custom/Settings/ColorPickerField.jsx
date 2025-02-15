import React from 'react';

function ColorPickerField({ label, value, onHandleStyleChange }) {
  return (
    <div className='flex flex-col gap-2'>
     <div>
     <label>{label}</label></div> 
      <input 
        type='color'
        value={value}
        onChange={(e) => onHandleStyleChange(e.target.value)}
      />
    </div>
  );
}

export default ColorPickerField;
