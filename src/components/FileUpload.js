import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 300px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }

  
`;

const UploadText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #555;
`;

const FileUpload = ({ onFileChange, onInvalidFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, []); 

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'video/mp4') {
      setError(null); 
      onFileChange(file);
    } else {
      handleInvalidFile(file);
    }
  };

  const handleInvalidFile = (file) => {
    const errorMessage = 'Invalid file type. Please upload an MP4 video.';
    setError(errorMessage);
    console.error(errorMessage);
    if (onInvalidFile) {
      onInvalidFile(file);
    }
  };

  const handleClick = () => {
    // Trigger the click event on the file input when the container is clicked
    fileInputRef.current.click();
  };

  return (
    <FileUploadContainer onClick={handleClick} onDragEnter={() => {}} onDragOver={() => {}} onDragLeave={() => {}} onDrop={() => {}}>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <UploadText>{isDragOver ? 'Drop the file here!' : 'Drag to upload a video'}</UploadText>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FileUploadContainer>
  );
};

export default FileUpload;