// src/components/FileList.tsx
import React, { DragEvent } from 'react';
import { DroppedFile } from '../types/types';

interface FileListProps {
  files: DroppedFile[];
  onDragStart: (event: DragEvent<HTMLDivElement>, filePath: string) => void;
  onRemoveFile: (id: string) => void;
}

export const FileList = ({ files, onDragStart, onRemoveFile }: FileListProps) => {
  return (
    <div
      className="file-list flex-grow p-2.5 overflow-y-auto"
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
    >
      {files.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <p className="text-center text-zinc-500">
            Drop files anywhere here
          </p>
        </div>
      ) : (
        files.map(file => (
          <div
            key={file.id}
            className="bg-white/10 text-white p-3 mb-2 rounded-sm cursor-grab text-sm flex justify-between items-center active:cursor-grabbing"
            draggable
            onDragStart={e => onDragStart(e, file.path)}
          >
            <span className="flex-1 select-none pr-2.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {file.name}
            </span>
            <button
              className="bg-transparent border-none text-zinc-400 text-2xl font-bold cursor-pointer p-0 ml-2.5 leading-none hover:text-white"
              onClick={() => onRemoveFile(file.id)}
            >
              &times;
            </button>
          </div>
        ))
      )}
    </div>
  );
};