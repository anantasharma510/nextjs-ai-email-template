import React from 'react'

function LogoComponent({style, imageUrl, outerStyle}) {
  return (
    <div>
      <img src={ imageUrl} alt="Image" style={style} className={outerStyle} />
    </div>
  )
}

export default LogoComponent
