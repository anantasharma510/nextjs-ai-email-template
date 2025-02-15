import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function TextAreaField({ label, value, onHandleInputChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">{label}</label>
      <Textarea 
        value={value || ''} 
        onChange={(event) => onHandleInputChange(event.target.value)} 
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default TextAreaField;
