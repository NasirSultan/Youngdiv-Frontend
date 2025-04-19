import React from 'react';
import { useTheme } from './Sitting';

function Example() {
  const { theme } = useTheme();

  // Apply dynamic styles based on the current theme
  const styles = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa', // Dark or Light background
    color: '#ffffff', // Force text color to white
    minHeight: '100vh', // Make sure it covers the full height of the viewport
    padding: '2rem', // Add some space around content
    transition: 'all 0.3s ease', // Smooth transition for changes
  };

  // Card styling for theme change
  const cardStyles = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff', // Card background
    color: '#ffffff', // Force card text to white
    borderColor: theme === 'dark' ? '#444444' : '#ddd', // Border color changes with theme
  };

  // Button styling based on theme
  const buttonStyles = {
    backgroundColor: theme === 'dark' ? '#444' : '#007bff', // Button background color
    color: '#fff', // Button text color
    border: 'none', // No border
    padding: '0.5rem 1rem', // Padding for button
    cursor: 'pointer', // Pointer on hover
  };

  return (
    <div style={styles}>
      <h2>Example Page</h2>
      <p>Current Theme: <strong>{theme}</strong></p>

      <div className="card mt-3" style={cardStyles}>
        <div className="card-body">
          This card respects the current Bootstrap theme with dynamic styles!
        </div>
      </div>

      <div className="mt-3">
        <button style={buttonStyles} onClick={() => alert('Button clicked')}>
          Sample Button
        </button>
      </div>
    </div>
  );
}

export default Example;
