import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SchemeFormPage.css';

const SchemeFormPage = ({ scheme, onSave, onCancel, selectedFont }) => {
  const [formData, setFormData] = useState(scheme || {
    title: '',
    description: '',
    subject: '',
    grade: '',
    duration: '',
    objectives: [''],
    resources: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={`form-page-container ${selectedFont}`}>
      <div className="form-page-header">
        <h2>{scheme ? 'Edit Education Scheme' : 'Create New Education Scheme'}</h2>
        <p>Fill in all the details below to {scheme ? 'update' : 'create'} your education scheme</p>
      </div>
      
      <form onSubmit={handleSubmit} className="scheme-form">
        <table className="form-table">
          <tbody>
            <tr>
              <th><label htmlFor="title">Title</label></th>
              <td>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            
            <tr>
              <th><label htmlFor="description">Description</label></th>
              <td>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </td>
            </tr>
            
            <tr>
              <th><label htmlFor="subject">Subject</label></th>
              <td>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
            
            <tr>
              <th><label htmlFor="grade">Grade Level</label></th>
              <td>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select grade level</option>
                  <option value="Elementary School">Elementary School</option>
                  <option value="Middle School">Middle School</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                </select>
              </td>
            </tr>
            
            <tr>
              <th><label htmlFor="duration">Duration (weeks)</label></th>
              <td>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </td>
            </tr>
            
            <tr>
              <th><label>Learning Objectives</label></th>
              <td>
                <div className="array-items">
                  {formData.objectives.map((obj, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                        required
                      />
                      {formData.objectives.length > 1 && (
                        <button 
                          type="button" 
                          className="remove-item"
                          onClick={() => removeArrayItem('objectives', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-item"
                    onClick={() => addArrayItem('objectives')}
                  >
                    Add Objective
                  </button>
                </div>
              </td>
            </tr>
            
            <tr>
              <th><label>Required Resources</label></th>
              <td>
                <div className="array-items">
                  {formData.resources.map((res, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={res}
                        onChange={(e) => handleArrayChange('resources', index, e.target.value)}
                        required
                      />
                      {formData.resources.length > 1 && (
                        <button 
                          type="button" 
                          className="remove-item"
                          onClick={() => removeArrayItem('resources', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-item"
                    onClick={() => addArrayItem('resources')}
                  >
                    Add Resource
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            {scheme ? 'Update Scheme' : 'Save Scheme'}
          </button>
        </div>
      </form>
    </div>
  );
};

SchemeFormPage.propTypes = {
  scheme: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedFont: PropTypes.string.isRequired
};

export default SchemeFormPage;