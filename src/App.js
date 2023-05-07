import React, { useCallback ,useState} from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const App = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://192.168.1.151:8080/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('File uploaded successfully:', response.data);
      setResponseMessage(`File uploaded successfully`);
    } catch (error) {
      setResponseMessage(`File uploaded successfully: ${error}`);
      console.error('Error uploading file:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default App;
