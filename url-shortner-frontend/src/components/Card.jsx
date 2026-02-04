import React from 'react';

const Card = ({ title, desc }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm md:text-base">{desc}</p>
    </div>
  );
};

export default Card;
