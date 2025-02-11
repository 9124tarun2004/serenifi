import React from 'react';

export const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full min-h-[100px] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);
