// src/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const subdomains = [
    { name: 'github', url: 'https://github.com/lardahle' },
    { name: 'repo', url: 'https://github.com/lardahle/lardahle.github.io' },
    //{ name: 'photography', url: 'https://lardahle.github.io/photography' },
    //{ name: 'music', url: 'https://lardahle.github.io/music' },
    //{ name: 'design', url: 'https://lardahle.github.io/design' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/landon-dahle/' },
    { name: 'instagram', url: 'https://www.instagram.com/hopefullyabysmal/' },
    { name: 'youtube', url: 'https://www.youtube.com/@HopefullyAbysmal' },
    { name: 'contact', url: 'https://mail.google.com/mail/u/0/landondahle@gmail.com&tf=cm' },

    // Add more subdomains as needed
];

const Terminal: React.FC = () => {
    // State to manage the current input and command history
    const [input, setInput] = useState<string>('');
    const [history, setHistory] = useState<{ command: string, output: string }[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null); // Index for command history navigation
    const terminalRef = useRef<HTMLDivElement>(null); // Ref to access terminal DOM element
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to the bottom of the terminal whenever the history updates
    useEffect(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    // Focus the input when it loses focus
    useEffect(() => {
        const handleFocus = () => {
            inputRef.current?.focus();
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener('blur', handleFocus);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('blur', handleFocus);
            }
        };
    }, []);

    const commands = ['help', 'about', 'clear', 'ls', 'cd'];

    const autocomplete = (input: string) => {
        const trimmedInput = input.trim().toLowerCase();

        if (trimmedInput.startsWith('cd ')) {
            const subdomainInput = trimmedInput.slice(3); // Get the part after 'cd '
            const match = subdomains.find(sub => sub.name.startsWith(subdomainInput));
            if (match) {
                return `cd ${match.name}`; // Autocomplete the subdomain name
            }
        } else {
            const match = commands.find(cmd => cmd.startsWith(trimmedInput));
            if (match) {
                return match; // Autocomplete the command
            }
        }

        return input; // Return the original input if no match is found
    };

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
            case 'Tab':
                e.preventDefault(); // Prevent default tab behavior
                setInput(autocomplete(input));
                break;
        }
    };

    const processCommand = (command: string) => {
        let output = '';
    
        const trimmedCommand = command.trim().toLowerCase();
    
        // Command processing logic
        if (trimmedCommand === 'ls') {
            output = subdomains
                .map(sub => {
                    const paddedName = sub.name.padEnd(20, ' '); // Pad subdomain names to a fixed width
                    return `${paddedName}`;
                })
                .join('\n'); // Separate each subdomain by a new line for better readability
        } else if (trimmedCommand.startsWith('cd ')) {
            const target = trimmedCommand.slice(3); // Extract the target subdomain
            const subdomain = subdomains.find(sub => sub.name === target);
    
            if (subdomain) {
                output = `Switching to ${target}...`;
                window.location.href = subdomain.url; // Redirect to the subdomain
            } else {
                output = `No such directory: ${target}`;
            }
        } else if (trimmedCommand === 'help') {
            output = `The goal of this site was to mimic a terminal interface, so the following commands are available for you to use!\n
        help : for if you ever get confused and want a quick reference\n
        about : project explanation\n
        clear : reset your terminal\n
        ls : list directories (sub-pages)\n
        cd [subdomain] : change directory (switch to sub-page)\n`;
        } else if (trimmedCommand === 'about') {
            output = 'Terminal interface created with React.';
        } else if (trimmedCommand === 'clear') {
            setHistory([]); // Clear command history
            return; // Exit early to avoid adding the clear command to history
        } else {
            output = `Command not found: ${command}`;
        }
    
        setHistory([...history, { command, output }]); // Add command and output to history
    };

    return (
        <div className="terminal-wrapper">
            <div className="terminal" ref={terminalRef} role="log" aria-live="polite">
                <div className="ASCII-wrapper">
                {/* Render ASCII-art */}
                <div className="ASCII-art">
                    <br />                                .....................
                    <br />                           ................................
                    <br />                       .......................................              
                    <br />                    .............................................           
                    <br />                 ..................................................         
                    <br />               ...........................-==-::===-===..............       
                    <br />             .........................=-.===......*=.:................      
                    <br />           :........................=.==.===....=.:.....................    
                    <br />          -:......................=.=.=-=.-====.=......=................-   
                    <br />        ===:::::...................=.=.==.==.=::......:=................=   
                    <br />       ====-===::.........===.......=.=.===.=+@..=...=..................==  
                    <br />      ============-.......-=====.....=.==.=*=.-.=..=.....................=  
                    <br />     ===============--:......:===.....*.=@-=#@@==.:=......................= 
                    <br />    ===================:..................@=.:@@*..........:===*@@@@@@@*:...
                    <br />   =====================:................................===@%:@@ : @+-@@@@-.                
                    <br />  ======================::.........-===:::.............====@::::=.: @@ @@@@@=.               
                    <br /> ========================:......::-==========-......:..==*@. @:@. #@@ %@: @@==               
                    <br /> ========================:.....:-=======*=*+====:.==:=..==@ @@%*.@@@ %::.  ===-              
                    <br /> +========******========::.:.:::==%@@@@@@@@@@@%==.........-  @:@@@@@@@@@-@@==...             
                    <br />#********#%#@@@@@@+=====::.:..=@@@@@@#@:@ @@@*====.........:@@:@@     .@:@:*.....            
                    <br />%#%@@@@@@@@@@@@@@@@%====:..:=:@       @@-:: @=====..........@@@@@@@@*@:@ ::......:           
                    <br />%%@@@@@@@@@@@@@@@@@@@======:@-=@@.@@:@@:@ =:@+====...........@@@@-.::::@@:........           
                    <br />%@@@@@@@@@@@@@@@@@@@@====@%: :@ #@:: @@ @:@.@@*=:::=............@@@ #:@.@..........          
                    <br /> %@@@@@@@@@@@@@@@@@@@*==@=@@@@@#@ .@@:@:@:@ @@@*:=:=:..@@@@@@:..=....:.............:..       
                    <br /> #%@@@@@@@@@@@@@@@@@@=*@==%: @@@%:@@+@ @: @::===.=====@@*@@@@@@...=.....==+@======.:..       
                    <br />  #%@@@@@@@@@@@@@@@@@=#@==::@:::::@@@@:@@=.: ==..====@@@@@@@@@@@=..==-==========-===-==      
                    <br />   %@@@@@@@@@@@@@@@@@=====@::@:@ @@@=@@@* @.....=====@@@@@@@@@@@@=..=@=@@%=============      
                    <br />   *%@@@@@@@@@@@@@@@@@===..@::@:@@@@@@@:@.....-=====@@@@@@@@@@@*@@...=================       
                    <br />    #%@@@@@@@@@@@%%%@@=.....+@@@@@@%@.=+.......=====@@@@@@@@@@+==%:....::========#@@@        
                    <br />     #%@@@@@@@@@@@@@@@@=.........-#:...........=====#@@@@@@@@@====........====*@             
                    <br />      #@@@@@@@@@@@@@@@@=....:.........=@#==#@@@@====:@@@@@@@@@=...........====:              
                    <br />       %@@@@@@@@@@@@@@@@=....===..:======@@@@@======...@@@@@@.............==%*.=             
                    <br />        %@@@@@@@@@@@@@@@==========@=================......................:.@=-.=            
                    <br />         %@@@@@@@@@@@@@==============================...=..:====............===.:=           
                    <br />          %@@@@@@@@@:================================:........:==...........===..=           
                    <br />           %@@@@@@====================================.....................:......=          
                    <br />             %@@@@@*@*+======*##*#@@*=#@@*==+=========-..............++:..........:          
                    <br />              @@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@==@=======.........@@:+.........=.....=         
                    <br />                @@@@@@@@@@@@@@@##*==@@@@@@@@@@==========..=..@=....=........@.......         
                    <br />                  @@@@@@@@@@@@@@%*===@       @@========..*@=..@:....-..-@ ...===.....        
                    <br />                   @@@@@@@@@@@@%%+===-.      %-=.@*@=.:=...=...@==-= ...+..====@=.....       
                    <br />                    %@@@@@@@@%@%*+=====..     @@=.%===.@==:@== ...=::#==-+==#:.+...:.=       
                    <br />                      @@@@@@@@%@#++=====...  ....::@@..=...=...=:.@===@==...:@@====:..       
                    <br />                        @@@@@@@%@@%#=====...-====.=..*=.+==@===%===@@=-=====#@*====:..=      
                    <br />                         @@@    %@@@*=====......@:@@==@=:%+.@@..:======@@@@@@===.==..:       
                    <br />                                 %@@@@*====:......====#@@@@@@@@@@@@@@@*@@=@=..:......=       
                    <br />                                  %@@@@*+====.........:=-=@@@@@@@@@@===-............:=       
                    <br />                                   @@@@@#***================*@=====:................         
                    <br />                                    @%@@@@@@@@=========+##========................:          
                    <br />                                       %@@@@@@@@==========*@=...::........:......:           
                    <br />                                            @@@@+=================:....:======@              
                    <br />                                               @@@@@#+===========-======  
                </div>
                <div className="ASCII-text-wrapper">
                <div className="ASCII-text">
                    <br />   ████████▄   ▄██████▄  ███▄▄▄▄       ███     
                    <br />   ███   ▀███ ███    ███ ███▀▀▀██▄ ▀█████████▄ 
                    <br />   ███    ███ ███    ███ ███   ███    ▀███▀▀██ 
                    <br />   ███    ███ ███    ███ ███   ███     ███   ▀ 
                    <br />   ███    ███ ███    ███ ███   ███     ███     
                    <br />   ███    ███ ███    ███ ███   ███     ███     
                    <br />   ███   ▄███ ███    ███ ███   ███     ███     
                    <br />   ████████▀   ▀██████▀   ▀█   █▀     ▄████▀   
                    <br />                                            
                </div>
                <div className="ASCII-text">
                    <br /> ▀█████████▄   ▄█        ▄█  ███▄▄▄▄      ▄█   ▄█▄
                    <br />  ███    ███ ███       ███  ███▀▀▀██▄   ███ ▄███▀ 
                    <br />  ███    ███ ███       ███▌ ███   ███   ███▐██▀   
                    <br /> ▄███▄▄▄██▀  ███       ███▌ ███   ███  ▄█████▀    
                    <br />▀▀███▀▀▀██▄  ███       ███▌ ███   ███ ▀▀█████▄    
                    <br />  ███    ██▄ ███       ███  ███   ███   ███▐██▄   
                    <br />  ███    ███ ███▌    ▄ ███  ███   ███   ███ ▀███▄ 
                    <br />▄█████████▀  █████▄▄██ █▀    ▀█   █▀    ███   ▀█▀ 
                    <br />             ▀                          ▀        
                </div>
                </div>
                {/* Render ASCII-art */}
                <div className="ASCII-art">
                    <br />                                   .....................   
                    <br />                            ................................                     
                    <br />                         .......................................                 
                    <br />                      .............................................              
                    <br />                    ..................................................           
                    <br />                  ..............===-===::-==-...........................         
                    <br />                 ................:.=*......===.-=.........................       
                    <br />               .....................:.=....===.==.=........................:     
                    <br />              -................=......=.====-.=-=.=.=......................:-    
                    <br />              =................=:......::=.==.==.=.=...................:::::===  
                    <br />             ==..................=...=..@+=.===.=.=.......===.........::===-==== 
                    <br />             =.....................=..=.-.=*=.==.=.....=====-.......-============
                    <br />            =......................=:.==@@#=-@=.*.....===:......:--===============                      
                    <br />           ...:*@@@@@@@*===:..........*@@:.=@..................:===================                     
                    <br />          .-@@@@-+@ : @@:%@===................................:=====================                    
                    <br />         .=@@@@@ @@ :.=::::@====.............:::===-.........::======================                   
                    <br />         ==@@ :@% @@# .@:@ .@*==..:......-==========-::......:========================                  
                    <br />        -===  .::% @@@.*%@@ @==..=:==.:====+*=*=======-:.....:========================                  
                    <br />       ...==@@-@@@@@@@@@:@  -.........==%@@@@@@@@@@@%==:::.:.::========******========+                  
                    <br />      .....*:@:@.     @@:@@:.........====*@@@ @:@#@@@@@@=..:.::=====+@@@@@@#%#********#                 
                    <br />     :......:: @:@*@@@@@@@@..........=====@ ::-@@       @:=:..:====%@@@@@@@@@@@@@@@@%#%                 
                    <br />     ........:@@::::.-@@@@...........====+@:= @:@@:@@.@@=-@:======@@@@@@@@@@@@@@@@@@@%%                 
                    <br />    ..........@.@:# @@@............=:::=*@@.@:@ @@ ::@# @: :%@====@@@@@@@@@@@@@@@@@@@@%                 
                    <br /> ..:.............:....=..:@@@@@@..:=:=:*@@@ @:@:@:@@. @#@@@@@=@==*@@@@@@@@@@@@@@@@@@@%                  
                    <br /> ..:.======@+==.....=...@@@@@@*@@=====.===::@ :@ @+@@:%@@@ :%==@*=@@@@@@@@@@@@@@@@@@%#                  
                    <br />==-===-==========-==..=@@@@@@@@@@@====..== :.=@@:@@@@:::::@::==@#=@@@@@@@@@@@@@@@@@%#                   
                    <br />=============%@@=@=..=@@@@@@@@@@@@=====.....@ *@@@=@@@ @:@::@=====@@@@@@@@@@@@@@@@@%                    
                    <br /> =================...@@*@@@@@@@@@@@=====-.....@:@@@@@@@:@::@..===@@@@@@@@@@@@@@@@@%*                    
                    <br />  @@@#========::....:%==+@@@@@@@@@@=====.......+=.@%@@@@@@+.....=@@%%%@@@@@@@@@@@%#                     
                    <br />       @*====........====@@@@@@@@@#=====...........:#-.........=@@@@@@@@@@@@@@@@%#                      
                    <br />        :====...........=@@@@@@@@@:====@@@@#==#@=.........:....=@@@@@@@@@@@@@@@@#
                    <br />       =.*%==.............@@@@@@...======@@@@@======:..===....=@@@@@@@@@@@@@@@@% 
                    <br />      =.-=@.:......................=================@==========@@@@@@@@@@@@@@@%  
                    <br />     =:.===............====:..=...==============================@@@@@@@@@@@@@%   
                    <br />     =..===...........==:........:================================:@@@@@@@@@%    
                    <br />    =......:.....................====================================@@@@@@%     
                    <br />    :..........:++..............-=========+==*@@#=*@@#*##*======+*@*@@@@@%       
                    <br />   =.....=.........+:@@.........=======@==@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@        
                    <br />   .......@........=....=@..=..==========@@@@@@@@@@==*##@@@@@@@@@@@@@@@          
                    <br />  .....===... @-..-....:@..=@*..========@@       @===*%@@@@@@@@@@@@@@            
                    <br /> .....=@====..+... =-==@...=...=:.=@*@.=-%      .-===+%%@@@@@@@@@@@@             
                    <br /> =.:...+.:#==+-==#::=... ==@:==@.===%.=@@     ..=====+*%@%@@@@@@@@%              
                    <br /> ..:====@@:...==@===@.:=...=...=..@@::....  ...=====++#@%@@@@@@@@                
                    <br />=..:====*@#=====-=@@===%===@==+.=*..=.====-...=====#%@@%@@@@@@@                  
                    <br /> :..==.===@@@@@@======:..@@.+%:=@==@@:@......=====*@@@%    @@@                   
                    <br /> =......:..=@=@@*@@@@@@@@@@@@@@@#====......:====*@@@@%    
                    <br /> =:............-===@@@@@@@@@@=-=:.........====+*@@@@%     
                    <br />   ................:=====@*================***#@@@@@      
                    <br />    :................========##+=========@@@@@@@@%@       
                    <br />     :......:........::...=@*==========@@@@@@@@%          
                    <br />        @======:....:=================+@@@@               
                    <br />             ======-===========+#@@@@@                    
                    <br />
                </div>
                </div>

                <div className="starter-text">
                    Howdy! Landon here, so you've found my portfolio gh-page! Outside of my 
                    more professional content I am super into digital art; 
                    photography, photo manipulation, music production, graphic design, etc.
                    This page will be my home base for posting my projects with some big
                    plans ahead so stay tuned! To get started type <span className="starter-text-highlight">help</span> then press <span className="starter-text-highlight">ENTER</span>.
                </div>

                {/* Render command history */}
                {history.map((entry, index) => (
                    <div key={index} className="output-line">
                        <span className="prompt">visitor:~$ {entry.command}</span> 
                        {/* <span className="command">{entry.command}</span> */}
                        <div className="output">{entry.output}</div>
                    </div>
                ))}
                {/* Render input line */}
                <div className="input-line">
                    <span className="prompt">visitor:~$ </span>
                    <input
                        className="input"
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoFocus // Auto-focus on the input field when the component mounts
                        ref={inputRef} // Reference to the input element
                        aria-label="Command input" // Accessibility label for the input field
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
