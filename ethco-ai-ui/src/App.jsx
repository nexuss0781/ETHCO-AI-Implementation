import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './App.css';
import { Folder, Save, Settings } from 'lucide-react';
import FileTree from './components/FileTree';

function App() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [editorContent, setEditorContent] = useState('// Select a file to start coding');

  const handleFileSelect = (path, content) => {
    setActiveFile(path);
    setEditorContent(content);
  };

  const handleOpenFolder = () => {
    // Simulate opening a folder and loading some files
    const dummyFiles = [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'App.jsx', type: 'file', content: 'import React from \'react\';\n\nfunction App() {\n  return (\n    <div>Hello from App.jsx</div>\n  );\n}\n\nexport default App;\n' },
          { name: 'index.css', type: 'file', content: 'body { margin: 0; }' },
        ],
      },
      { name: 'package.json', type: 'file', content: '{ "name": "ethco-ai-ui", "version": "0.1.0" }' },
      { name: 'README.md', type: 'file', content: '# ETHCO AI UI' },
    ];
    setFiles(dummyFiles);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* File Tree / Left Sidebar */}
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
        <h2 className="text-lg font-bold mb-4">File Explorer</h2>
        <button
          onClick={handleOpenFolder}
          className="mb-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center"
        >
          <Folder size={18} className="mr-2" /> Open Folder
        </button>
        <div className="flex-1 overflow-y-auto">
          <FileTree files={files} onFileSelect={handleFileSelect} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar / Iconography */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          <h1 className="text-xl font-bold">ETHCO AI</h1>
          <div className="ml-auto flex space-x-4">
            <Folder className="h-6 w-6 text-gray-400 hover:text-gray-100 cursor-pointer" onClick={handleOpenFolder} />
            <Save className="h-6 w-6 text-gray-400 hover:text-gray-100 cursor-pointer" />
            <Settings className="h-6 w-6 text-gray-400 hover:text-gray-100 cursor-pointer" />
          </div>
        </div>

        {/* Editor and Chat Window */}
        <div className="flex flex-1">
          {/* Editor */}
          <div className="flex-1 bg-gray-900 p-4">
            <h2 className="text-lg font-bold mb-4">Editor: {activeFile || 'No file selected'}</h2>
            <Editor
              height="90%"
              defaultLanguage="javascript"
              value={editorContent}
              theme="vs-dark"
              onChange={(value) => setEditorContent(value)}
            />
          </div>

          {/* Chat Window / Right Sidebar */}
          <div className="w-80 bg-gray-800 p-4 border-l border-gray-700 flex flex-col">
            <h2 className="text-lg font-bold mb-4">ETHCO AI Chat</h2>
            <div className="flex-1 overflow-y-auto text-gray-400">Chat history will appear here</div>
            <input type="text" placeholder="Message ETHCO AI..." className="w-full bg-gray-700 text-gray-100 p-2 rounded-md mt-4 focus:outline-none" />
          </div>
        </div>

        {/* Terminal */}
        <div className="h-48 bg-gray-800 p-4 border-t border-gray-700">
          <h2 className="text-lg font-bold mb-4">Terminal</h2>
          <div className="text-gray-400">Terminal output will appear here</div>
        </div>
      </div>
    </div>
  );
}

export default App;


