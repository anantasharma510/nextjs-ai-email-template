import React from 'react'

function ImageComponent({style, imageUrl,outerStyle}) {
  return (
    <div>
      <img
        src={ imageUrl}
        alt="Image"
        style={style}
        className={outerStyle}
        />
    </div>
  )
}

export default ImageComponent
