// src/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [history, setHistory] = useState<{ command: string, output: string }[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            processCommand(input);
            setInput('');
            setHistoryIndex(null);
        } else if (e.key === 'ArrowUp') {
            if (historyIndex === null) {
                setHistoryIndex(history.length - 1);
            } else if (historyIndex > 0) {
                setHistoryIndex(historyIndex - 1);
                setInput(history[historyIndex - 1].command);
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex !== null && historyIndex < history.length - 1) {
                setHistoryIndex(historyIndex + 1);
                setInput(history[historyIndex + 1].command);
            } else {
                setInput('');
                setHistoryIndex(null);
            }
        }
    };

    const processCommand = (command: string) => {
        let output = '';

        // Simple command handling
        switch (command.trim().toLowerCase()) {
            case 'help':
                output = 'Available commands: help, about, clear';
                break;
            case 'about':
                output = 'Terminal interface created with React.';
                break;
            case 'clear':
                setHistory([]);
                return; // Exit early to avoid adding the clear command to history
            default:
                output = `Command not found: ${command}`;
                break;
        }

        setHistory([...history, { command, output }]);
    };

    return (
        <div className="terminal-wrapper">
            <div className="terminal" ref={terminalRef}>
                {history.map((entry, index) => (
                    <div key={index} className="output-line">
                        <span className="prompt">visitor:~$</span>
                        <span className="command">{entry.command}</span>
                        <div className="output">{entry.output}</div>
                    </div>
                ))}
                <div className="input-line">
                    <span className="prompt">visitor:~$</span>
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
        </div>
    );
};

export default Terminal;
