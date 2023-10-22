// Import React and Tailwind CSS
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

// Define the Sidebar component
const Sidebar = () => {
  // Define state to track the current section
  const [currentSection, setCurrentSection] = useState(1);

  // Define the titles of the sections
  const sectionTitles = [
    'Warm-Up',
    'Vocal Exercises',
    'Articulation Exercises',
    'Language Exercises',
    'Cool Down'
  ];

  // Render the sidebar
  return (
    <div className="p-4 bg-gray-100 border border-gray-300" style={{ opacity: 0.5 }}>
      <h1 className="text-xl font-bold mb-2">Session Progress</h1>
      <ul style={{ opacity: 1 }}>
        {sectionTitles.map((title, index) => (
          <li className={`mb-2 border rounded p-2 hover:bg-blue-200 ${index + 1 === currentSection ? 'font-bold' : ''}`} key={index} >
            {index + 1}. {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the Sidebar component
export default Sidebar;