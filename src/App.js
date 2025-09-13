import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SchemeCard from './componets/SchemeCard/SchemeCard';
import SchemeFormPage from './componets/SchemeFormPage/SchemeFormPage';
import ConfirmModal from './componets/ConfirmModal/ConfirmModal';
import FooterControls from './componets/FooterControls/FooterControls'
import './App.css';

const sampleSchemes = [
  {
    id: '1',
    title: 'Mathematics Curriculum',
    description: 'Comprehensive math curriculum covering algebra, geometry, and calculus for high school students.',
    subject: 'Mathematics',
    grade: 'High School',
    duration: 12,
    objectives: ['Master algebraic concepts', 'Understand geometric principles', 'Solve calculus problems'],
    resources: ['Textbook', 'Online exercises', 'Graphing calculator'],
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Science Fundamentals',
    description: 'Basic principles of physics, chemistry, and biology for middle school students.',
    subject: 'Science',
    grade: 'Middle School',
    duration: 8,
    objectives: ['Understand scientific method', 'Learn basic physics', 'Explore chemical reactions'],
    resources: ['Lab equipment', 'Science kit', 'Reference books'],
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    title: 'Literature Program',
    description: 'Classic and contemporary literature analysis for advanced English students.',
    subject: 'English',
    grade: 'High School',
    duration: 10,
    objectives: ['Analyze literary themes', 'Develop critical thinking', 'Improve writing skills'],
    resources: ['Novels', 'Study guides', 'Writing handbook'],
    createdAt: new Date(Date.now() - 172800000)
  }
];

function App() {
  const [schemes, setSchemes] = useState(() => {
    const savedSchemes = localStorage.getItem('schemes');
    return savedSchemes ? JSON.parse(savedSchemes) : sampleSchemes;
  });
  
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFont, setSelectedFont] = useState('font-arial');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);
  const [schemeToDelete, setSchemeToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFormPage, setShowFormPage] = useState(false);

  // Save to localStorage whenever schemes change
  useEffect(() => {
    localStorage.setItem('schemes', JSON.stringify(schemes));
  }, [schemes]);

  // Filter schemes based on search term
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = schemes.filter(scheme => 
        Object.values(scheme).some(
          value => typeof value === 'string' && 
                  value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredSchemes(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, schemes]);

  const handleAddScheme = () => {
    setCurrentScheme(null);
    setShowFormPage(true);
  };

  const handleEditScheme = (scheme) => {
    setCurrentScheme(scheme);
    setShowFormPage(true);
  };

  const handleDeleteScheme = (scheme) => {
    setSchemeToDelete(scheme);
    setShowConfirmModal(true);
  };

  const handleSaveScheme = (schemeData) => {
    if (schemeData.id) {
      // Update existing scheme
      setSchemes(schemes.map(s => s.id === schemeData.id ? schemeData : s));
    } else {
      // Add new scheme
      setSchemes([{ 
        ...schemeData, 
        id: Date.now().toString(),
        createdAt: new Date()
      }, ...schemes]);
    }
    setShowFormPage(false);
  };

  const handleCancelForm = () => {
    setShowFormPage(false);
    setCurrentScheme(null);
  };

  const handleConfirmDelete = () => {
    setSchemes(schemes.filter(s => s.id !== schemeToDelete.id));
    setShowConfirmModal(false);
    setSchemeToDelete(null);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (showFormPage) {
    return (
      <SchemeFormPage 
        scheme={currentScheme}
        onSave={handleSaveScheme}
        onCancel={handleCancelForm}
        selectedFont={selectedFont}
      />
    );
  }

  return (
    <div className={`app-container ${selectedFont}`}>
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">Education Scheme Manager</h1>
          <p className="app-subtitle">Organize and manage your educational schemes efficiently</p>
        </header>
        
        <div className="search-container">
          <div className="search-input-container">
            <svg className="search-icon" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search schemes by title, description, subject or grade..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search schemes"
            />
            {searchTerm && (
              <button 
                className="clear-search-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <main className="schemes-container">
          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          ) : filteredSchemes.length > 0 ? (
            <div className="schemes-grid">
              {filteredSchemes.map(scheme => (
                <SchemeCard 
                  key={scheme.id}
                  scheme={scheme}
                  onEdit={handleEditScheme}
                  onDelete={handleDeleteScheme}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0V0z" fill="none"/>
              </svg>
              <h3 className="empty-state-title">No schemes found</h3>
              <p className="empty-state-description">Try adjusting your search or add a new scheme</p>
              <button 
                className="empty-state-action"
                onClick={handleAddScheme}
              >
                Add New Scheme
              </button>
            </div>
          )}
        </main>
      </div>
      
      <FooterControls 
        selectedFont={selectedFont}
        onFontChange={setSelectedFont}
        onAddScheme={handleAddScheme}
      />
      
      <ConfirmModal 
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete "${schemeToDelete?.title}"?`}
        message="Are you sure you want to delete this scheme? This action cannot be undone."
        confirmText="Delete Scheme"
        cancelText="Cancel"
      />
    </div>
  );
}

App.propTypes = {
  // Add prop types if this component receives any props
};

export default App;