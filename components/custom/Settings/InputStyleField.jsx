import { Input } from '@/components/ui/input';
import React from 'react';

function InputStyleField({label, value = '', onHandleStyleChange, type = 'px'}) {
  const FormattedValue = (value) => {
    if (value) {
      return value.replace(type, '');
    }
    return ''; // Return an empty string if value is undefined or null
  };

  return (
    <div>
      <label>{label}</label>
      <div>
        <Input
          type='text'
          value={FormattedValue(value)}
          onChange={(e) => onHandleStyleChange(e.target.value + type)} 
        />
        <h2 className='p-2 bg-gray-100 rounded-r-lg -ml-2'>{type}</h2>
      </div>
    </div>
  );
}

export default InputStyleField;
