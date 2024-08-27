// src/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, []);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setHistory([...history, input]);
        setInput('');
        setHistoryIndex(null);
      } else if (e.key === 'ArrowUp') {
        if (historyIndex === null) {
          setHistoryIndex(history.length - 1);
        } else if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
          setInput(history[historyIndex - 1]);
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex !== null && historyIndex < history.length - 1) {
          setHistoryIndex(historyIndex + 1);
          setInput(history[historyIndex + 1]);
        } else {
          setInput('');
          setHistoryIndex(null);
        }
      }
    };
  
    return (
      <div className="terminal" ref={terminalRef}>
        <div className="input-line">
          <span className="prompt">$</span>
          <input
            className="input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    );
  };
  

export default Terminal;
