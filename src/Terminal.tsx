// src/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal: React.FC = () => {
    // State to manage the current input and command history
    const [input, setInput] = useState<string>('');
    const [history, setHistory] = useState<{ command: string, output: string }[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null); // Index for command history navigation
    const terminalRef = useRef<HTMLDivElement>(null); // Ref to access terminal DOM element

    // Scroll to the bottom of the terminal whenever the history updates
    useEffect(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    // Handle changes to the input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Handle key events for the input field
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                processCommand(input); // Process the command when Enter is pressed
                setInput(''); // Clear input field after processing
                setHistoryIndex(null); // Reset history index
                break;
            case 'ArrowUp':
                if (historyIndex === null) {
                    setHistoryIndex(history.length - 1); // Navigate to the most recent command if no history is selected
                } else if (historyIndex > 0) {
                    setHistoryIndex(historyIndex - 1); // Move up in history
                    setInput(history[historyIndex - 1].command); // Set input to the previous command
                }
                break;
            case 'ArrowDown':
                if (historyIndex !== null && historyIndex < history.length - 1) {
                    setHistoryIndex(historyIndex + 1); // Move down in history
                    setInput(history[historyIndex + 1].command); // Set input to the next command
                } else {
                    setInput(''); // Clear input if at the end of history
                    setHistoryIndex(null); // Reset history index
                }
                break;
        }
    };

    // Process and handle commands
    const processCommand = (command: string) => {
        let output = '';

        // Command processing logic
        switch (command.trim().toLowerCase()) {
            case 'help':
                output = 'Available commands: help, about, clear'; // Help command
                break;
            case 'about':
                output = 'Terminal interface created with React.'; // About command
                break;
            case 'clear':
                setHistory([]); // Clear command history
                return; // Exit early to avoid adding the clear command to history
            default:
                output = `Command not found: ${command}`; // Default message for unknown commands
                break;
        }

        setHistory([...history, { command, output }]); // Add command and output to history
    };

    return (
        <div className="terminal-wrapper">
            <div className="terminal" ref={terminalRef} role="log" aria-live="polite">
                {/* Render ASCII-art */}
                <div className="ASCII-art">
                <br />                                                               :......................                                                       
                <br />                                                         :..................................                                                 
                <br />                                                     :..........................................                                             
                <br />                                                   ................................................                                          
                <br />                                                .....................................................:                                       
                <br />                                              ...............::::.......................................:                                    
                <br />                                             ................:==:::----:::::-:............................:                                  
                <br />                                           ...................:.:=--===-::===:-=:...........................:                                
                <br />                                          ...................:....:--:-::-==-:==:=::.........................:                               
                <br />                                         =:.................=:....:.=:=-===::=:=:=:::........................:==                             
                <br />                                         =:.................=:::..:.-:==--==:==:=-==:...................::::::===                            
                <br />                                        ==..................::=::.::.:@%=-:===:=-=:-.....:===:........:::--:--=====                          
                <br />                                        =:....................-.==.-=.+=.=*=:==:=::....:=====-:.....::=-============                         
                <br />                                       +:.......................==.-=:=@@+=:**:=:....:====:.......::=================                        
                <br />                                      :.....:::---::==::.........:::+@@@+:=@#::......:==:.......:-====================                       
                <br />                                     :.:*@@@@@*@==@@@@+==:..........:::::::....................:=======================                      
                <br />                                    :=@@@@@@#.*::==@ :%@+==:..................................:=========================                     
                <br />                                   :=%@@@@%##*=-:*-*.+:.@#===:............::-======-:........::=========================                     
                <br />                                   ==@@#+*#=%=@@%===*=@#:@+==:.:.::...:=============-::......:-==========================                    
                <br />                                  :==== .:=#=#=%@%=@=%@@**==::=:-=:.-++++*#***++======::....::-==========================                    
                <br />                                 .::-==@%@*@@#@@@=@@-=%@%-...:.....:+#@@@@@@@@@@@@@%+=:::::::::========+*#*****+++====*+*+                   
                <br />                                ....:-=%@%@@:+%@*#@%@:.:+..........===*@@@@@@-:: .=@@@@*-::::::======+@@@@@@@%%%#*****###*                   
                <br />                               :......=#=%%%@=-=*@@*==**:.........:====+@@#*@@*%@@@@@@%-%#-...:-===+#@@@@@@@@@@@@@@@@@@%%%                   
                <br />                               :......:%*%%=:*#%#@%###*:..........:=====%%%=%*+%*##%*%%%*%%==::====#@@@@@@@@@@@@@@@@@@@@@@                   
                <br />                              ..........*@#@#=:#.=@@%:..........::=:-=*@:%@%*+%-.@%%@@%@@@+@@%=====@@@@@@@@@@@@@@@@@@@@@@@                   
                <br />                            .:...........:@@-*% *@:::..:%@@=:...=:::=+@*+@@ -%:-=@::%#*@%@@@-*%===+@@@@@@@@@@@@@@@@@@@@@@%                   
                <br />                          ...:..:::::=::.......:--=::*@@@@@@@+::=:-=:#%+@@-+%%:#:%=*%*%*--%@@**@+=*@@@@@@@@@@@@@@@@@@@@@@                    
                <br />                          -..::-=====+*++==..:--=..-@@@@@@@@@@#====:.===%==@:*@=%@%@@=*@@@-#:==*@#%@@@@@@@@@@@@@@@@@@@@@%                    
                <br />                         ==-====-========++%====..*@@@@@@@@@@@@+====.:==+-@@#@@-@@*@-#:%*:#::-=*@+@@@@@@@@@@@@@@@@@@@@@%                     
                <br />                          ==============%@@*@*=..=@@@@@@@@@@@@@@=====..:.:#=:%@@@*@%#%=%-*=%#+=+==@@@@@@@@@@@@@@@@@@@@%%                     
                <br />                          +================+==..:@@@@@@@@@@@@@@@======-...:-*@+#@@%@@@@*@++@=.====@@@@@@@@@@@@@@@@@@@%%                      
                <br />                           @@@%+==========::....-%+=*@@@@@@@@@@@=====:.......@@@*@@*@%*@@@@:..:::*@@@%%@@@@@@@@@@@@@@%                       
                <br />                               @@@%+====:.:.....====+@@@@@@@@@@@======.........:#@@@@@@*:.......=@@@@@@@@@@@@@@@@@@@%                        
                <br />                                  +%+===:.......--=-=%@@@@@@@@@@=====*@@@@#%#=:................:%@@@@@@@@@@@@@@@@@@%                         
                <br />                                 +-:%*==:...........:+@@@@@@@@#:====++#@@@@@%@@@%=:....::=:...:+@@@@@@@@@@@@@@@@@@%#                         
                <br />                                +=.=*%==..............=@@@@@+...:=====%@%%@@+==+%@%+======:::==*@@@@@@@@@@@@@@@@@%%                          
                <br />                                =:.==#:............:==:.....:..:======++===========+*+=========*@@@@@@@@@@@@@@@@@%                           
                <br />                               =-.===-............:====-..:=...-================================@@@@@@@@@@@@@@@@%                            
                <br />                              ==..===:............==:.........:====================================+%@@@@@@@@@@                              
                <br />                              =:..:.:=::.........::...........-======================================+@@@@@@@@                               
                <br />                              :....:....-.::::...............:==========++++*%**+*#%#*#%%*++=+++++#@@@@@@@@@%                                
                <br />                             =:....=:.........:::=-:.........========##+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                  
                <br />                             :......+*...:....:+:...:-==::..:======*@==%@@@@@@@@@@==+*@@@@@@@@@@@@@@@@@@@@                                   
                <br />                            ....:==-=::@@-....-....:=:..:%@*==========%@@   @@@@@===*@@@@@@@@@@@@@@@@@@@                                     
                <br />                           ....:::==::=..::=*%::...==..:+:..-#*=+=++%@@@@      .:==+*%@@@@@@@@@@@@@@@@                                       
                <br />                          =.....:=:===..-=::--.:=%%%=::-*.:=*=.===+.:@=%      .:====**@@@@@@@@@@@@@@@                                        
                <br />                          ===-:..==:.:=*@==+@====..::.=# @#@@=+#*#==@@@     ..:====++**@@@@@@@@@@@@                                          
                <br />                          =:.-====#@%=-::+@@*==%%:==*.::+::-=::+%--::...=:...:====+**#@@@@@@@@@@@                                            
                <br />                          =..:==:=@*#@%%+===:%@*==+%===*#==@==%=-==-====:....=====%@@@@@@@@@@@@%                                             
                <br />                          =:.:==.===#@@@@@@*+*====-.:%@=:+@==@*=*@*-%......:====+*@@@@@   @@@@@                                              
                <br />                          =-...:.:-::=+@*@@%@@@@@@@@@@@@@@@@%*====-......:====+*@@@@@                                                        
                <br />                          ==:.........:.:-=+#%@@@@@@@@@@@@===----:......:===++#@@@@@@                                                        
                <br />                            =:...............:==***==#@@+==========::-====***%@@@@@@                                                         
                <br />                             =:.................:========+%%+===+======+%@@@@@@@@@@                                                          
                <br />                              =:................:=======%@@+======@@@@@@@@@@@@@#@@                                                           
                <br />                                ==--=====:.....:-==:::=-:::-=======+@@@@@@@@@@                                                               
                <br />                                   @=*+====::..::---============*%@@@@@@@                                                                    
                <br />                                         **%=================+@@@@@@@                                                                        
                </div>
                {/* Render starter text */}
                <div className="starter-text">                                                                                                                                                                                                                                
                    <br />████████▄   ▄██████▄  ███▄▄▄▄       ███          ▀█████████▄   ▄█        ▄█  ███▄▄▄▄      ▄█   ▄█▄
                    <br />███   ▀███ ███    ███ ███▀▀▀██▄ ▀█████████▄        ███    ███ ███       ███  ███▀▀▀██▄   ███ ▄███▀
                    <br />███    ███ ███    ███ ███   ███    ▀███▀▀██        ███    ███ ███       ███▌ ███   ███   ███▐██▀  
                    <br />███    ███ ███    ███ ███   ███     ███   ▀       ▄███▄▄▄██▀  ███       ███▌ ███   ███  ▄█████▀   
                    <br />███    ███ ███    ███ ███   ███     ███          ▀▀███▀▀▀██▄  ███       ███▌ ███   ███ ▀▀█████▄   
                    <br />███    ███ ███    ███ ███   ███     ███            ███    ██▄ ███       ███  ███   ███   ███▐██▄  
                    <br />███   ▄███ ███    ███ ███   ███     ███            ███    ███ ███▌    ▄ ███  ███   ███   ███ ▀███▄
                    <br />████████▀   ▀██████▀   ▀█   █▀     ▄████▀        ▄█████████▀  █████▄▄██ █▀    ▀█   █▀    ███   ▀█▀
                    <br />                                                              ▀                          ▀        
                </div>
                {/* Render command history */}
                {history.map((entry, index) => (
                    <div key={index} className="output-line">
                        <span className="prompt">visitor:~$</span>
                        <span className="command">{entry.command}</span>
                        <div className="output">{entry.output}</div>
                    </div>
                ))}
                {/* Render input line */}
                <div className="input-line">
                    <span className="prompt">visitor:~$</span>
                    <input
                        className="input"
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoFocus // Auto-focus on the input field when the component mounts
                        aria-label="Command input" // Accessibility label for the input field
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
