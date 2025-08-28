// src/hooks/useFileDrop.ts
import { useState, DragEvent } from 'react';
import { DroppedFile } from '../types/types';

export const useFileDrop = (initialFiles: DroppedFile[] = []) => {
  const [files, setFiles] = useState<DroppedFile[]>(initialFiles);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const existingPaths = new Set(files.map(f => f.path));
    const droppedFiles = Array.from(event.dataTransfer.files)
      .filter(file => !existingPaths.has((file as any).path))
      .map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        path: (file as any).path,
      }));

    if (droppedFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    }
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleRemoveFile = (idToRemove: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== idToRemove));
  };

  return {
    files,
    isDraggingOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClear,
    handleRemoveFile,
  };
};