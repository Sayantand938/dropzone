// src/App.tsx
import { DragEvent } from 'react';
import clsx from 'clsx';
import { useFileDrop } from './hooks/useFileDrop';
import { Header } from './components/Header';
import { FileList } from './components/FileList';
import { Footer } from './components/Footer';

function App() {
  const {
    files,
    isDraggingOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClear,
    handleRemoveFile,
  } = useFileDrop();

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    filePath: string,
  ) => {
    event.preventDefault();
    (window as any).ipcRenderer.send('ondragstart', filePath);
  };

  const handleGrabAllDragStart = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const allFilePaths = files.map(file => file.path);
    (window as any).ipcRenderer.send('ondragstart-all', allFilePaths);
  };

  const handleCloseApp = () => {
    (window as any).ipcRenderer.send('close-app');
  };

  return (
    <div
      className={clsx(
        'bg-zinc-800/80 rounded-sm h-full flex flex-col overflow-hidden border border-white/10',
        { 'bg-zinc-700/90 border-blue-500': isDraggingOver },
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <Header onCloseApp={handleCloseApp} />
      <FileList
        files={files}
        onDragStart={handleDragStart}
        onRemoveFile={handleRemoveFile}
      />
      <Footer
        files={files}
        onGrabAllDragStart={handleGrabAllDragStart}
        onClear={handleClear}
      />
    </div>
  );
}

export default App;