import React from 'react';

function ElementLayoutCard({ layout }) {
  const Icon = layout.icon; // Assuming layout.icon is a React component

  return (
    <div className="flex items-center flex-col justify-center border border-dashed rounded-xl p-3 group hover:shadow-md hover:border-primary cursor-pointer">
      <Icon className="p-2 h-8 w-8 group-hover:text-primary hover:bg-purple-100 rounded-full" />
      <h2 className="group-hover:text-primary">{layout.label}</h2>
    </div>
  );
}

export default ElementLayoutCard;
