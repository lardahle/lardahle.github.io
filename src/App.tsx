// src/App.tsx
import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';
import FileExplorer from './FileExplorer'; // Assuming you've created this component
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 950);

  // Update the isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div className="terminal-wrapper">
        {isMobile ? <FileExplorer /> : <Terminal />}
      </div>
    </div>
  );
}

export default App;
