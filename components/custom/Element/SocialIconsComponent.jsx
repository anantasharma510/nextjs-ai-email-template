import React from 'react';

function SocialIconsComponent({ style, socialIcons, outerStyle }) {
  return (
    <div className={outerStyle}>
      {socialIcons.map((iconObj, index) => (
        <a key={index} href={iconObj.url} target="_blank" rel="noopener noreferrer">
          <img src={iconObj.icon} alt="social icon" style={style} />
        </a>
      ))}
    </div>
  );
}

export default SocialIconsComponent;
