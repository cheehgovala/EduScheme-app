// components/FooterControls/FooterControls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './FooterControls.css';

const FooterControls = ({ 
  selectedFont, 
  onFontChange, 
  onAddScheme,
  disabled = false 
}) => {
  const fontOptions = [
    { value: 'font-arial', label: 'Arial' },
    { value: 'font-times', label: 'Times New Roman' },
    { value: 'font-courier', label: 'Courier New' },
    { value: 'font-verdana', label: 'Verdana' },
    { value: 'font-georgia', label: 'Georgia' }
  ];

  return (
    <footer className="footer-controls">
      <div className="footer-container">
        <div className="footer-content">
          <div className="font-selector">
            <label htmlFor="font-select" className="font-label">
              Font:
            </label>
            <select
              id="font-select"
              value={selectedFont}
              onChange={(e) => onFontChange(e.target.value)}
              className="font-dropdown"
              disabled={disabled}
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={onAddScheme}
            className="add-scheme-button"
            disabled={disabled}
            aria-label="Add color scheme"
          >
            <span className="button-icon">+</span>
            <span className="button-text">Add Scheme</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

FooterControls.propTypes = {
  selectedFont: PropTypes.string.isRequired,
  onFontChange: PropTypes.func.isRequired,
  onAddScheme: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default FooterControls;