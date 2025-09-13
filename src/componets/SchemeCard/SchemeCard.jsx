// components/SchemeCard/SchemeCard.jsx
import React from 'react';
import './SchemeCard.css';

const SchemeCard = ({ scheme, onEdit, onDelete }) => {
  const colors = {
    'Elementary': 'bg-blue-100 text-blue-800',
    'Middle School': 'bg-green-100 text-green-800',
    'High School': 'bg-purple-100 text-purple-800',
    'College': 'bg-yellow-100 text-yellow-800'
  };
  
  const gradeColor = colors[scheme.grade] || 'bg-gray-100 text-gray-800';

  return (
    <div className="scheme-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold truncate">{scheme.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${gradeColor}`}>{scheme.grade}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span><i className="fas fa-book mr-1"></i> {scheme.subject}</span>
          <span><i className="fas fa-clock mr-1"></i> {scheme.duration} weeks</span>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-end gap-2 border-t">
        <button 
          className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
          onClick={() => onEdit(scheme)}
        >
          <i className="fas fa-edit mr-1"></i> Edit
        </button>
        <button 
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
          onClick={() => onDelete(scheme)}
        >
          <i className="fas fa-trash mr-1"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;