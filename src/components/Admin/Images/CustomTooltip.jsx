import React from 'react';

function CustomTooltip({ data }) {
  return (
    <div className="custom-tooltip relative overflow-hidden rounded-lg shadow-md">
      <img
        src={data.image_path}
        alt="image"
        className="w-full h-64 object-cover rounded-t-lg"
      />
    </div>
  );
}

export default CustomTooltip;
