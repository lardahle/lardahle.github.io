import React from 'react';
import './FileExplorer.css';

// Define the folder structure
const subdomains = [
    { name: 'github', url: 'https://github.com/lardahle' },
    { name: 'repo', url: 'https://github.com/lardahle/lardahle.github.io' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/landon-dahle/' },
    { name: 'instagram', url: 'https://www.instagram.com/hopefullyabysmal/' },
    { name: 'youtube', url: 'https://www.youtube.com/@HopefullyAbysmal' },
    { name: 'contact', url: 'mailto:landondahle@gmail.com' },
    // Add your other subdomains here
];

const FileExplorer: React.FC = () => {
    return (
        <div className="file-explorer">
            <span>Mobile view is still in development, please view on desktop for best experience!</span>
            {subdomains.map((sub, index) => (
                <a key={index} href={sub.url} className="folder">
                    <pre className="folder-icon">
                        {/* Add your ASCII art here for each folder */}
                        {`+---+
|${sub.name.slice(0, 3)}|
+---+`}
                    </pre>
                    <span className="folder-name">{sub.name}</span>
                </a>
            ))}
        </div>
    );
};

export default FileExplorer;
