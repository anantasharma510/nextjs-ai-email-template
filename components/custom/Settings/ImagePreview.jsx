import { Input } from '@/components/ui/input'
import React from 'react'

function ImagePreview({label,value,handleInputChange}) {
  return (
    <div>
      <label>{label}</label>
      <img src='{value}'
      alt='image'
      className='w-full h-[150] object-cover border rounded-xl'
      />
      <Input value={value} onChange={(event) => handleInputChange(event.target.value)}
      className="mt-2"
      />
    </div>
  )
}

export default ImagePreview
