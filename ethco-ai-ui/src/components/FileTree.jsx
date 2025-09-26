import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

const FileTree = ({ files, onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderTree = (items, path = '') => {
    return (
      <ul className="list-none p-0 m-0">
        {items.map(item => {
          const itemPath = `${path}/${item.name}`;
          const isExpanded = expandedFolders[itemPath];

          if (item.type === 'folder') {
            return (
              <li key={itemPath} className="mt-1">
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-700 rounded-md p-1"
                  onClick={() => toggleFolder(itemPath)}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <Folder size={16} className="mr-2 ml-1 text-blue-400" />
                  <span>{item.name}</span>
                </div>
                {isExpanded && item.children && (
                  <div className="ml-4">
                    {renderTree(item.children, itemPath)}
                  </div>
                )}
              </li>
            );
          } else {
            return (
              <li key={itemPath} className="mt-1">
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-700 rounded-md p-1"
                  onClick={() => onFileSelect(itemPath, item.content)}
                >
                  <File size={16} className="mr-2 ml-5 text-gray-400" />
                  <span>{item.name}</span>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="text-sm">
      {files.length > 0 ? renderTree(files) : <div className="text-gray-400">No folder open</div>}
    </div>
  );
};

export default FileTree;


