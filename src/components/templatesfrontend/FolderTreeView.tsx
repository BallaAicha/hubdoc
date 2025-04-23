import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import {FolderStructure} from "../../types/types.ts";


interface FolderTreeViewProps {
  structure: FolderStructure;
  level?: number;
}

const FolderTreeView: React.FC<FolderTreeViewProps> = ({ structure, level = 0 }) => {
  const [expanded, setExpanded] = useState(level < 3);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const marginLeft = `${level * 16}px`;

  if (structure.type === 'file') {
    return (
      <div 
        className="flex items-center py-1 text-sm" 
        style={{ marginLeft }}
      >
        <FileText size={16} className="text-gray-500 mr-2" />
        <span>{structure.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="flex items-center py-1 cursor-pointer text-sm hover:bg-gray-100 rounded"
        onClick={toggleExpanded}
        style={{ marginLeft }}
      >
        {expanded ? (
          <ChevronDown size={16} className="text-gray-500 mr-1" />
        ) : (
          <ChevronRight size={16} className="text-gray-500 mr-1" />
        )}
        <Folder size={16} className="text-blue-500 mr-2" />
        <span className="font-medium">{structure.name}</span>
      </div>
      
      {expanded && structure.children && (
        <div>
          {structure.children.map((child, index) => (
            <FolderTreeView 
              key={`${child.name}-${index}`} 
              structure={child} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderTreeView;