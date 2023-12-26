import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';


function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulating file submission to a server
    console.log('File submitted:', selectedFile);

    // In a real application, you'd send the file to a server here
    // using a library like axios or fetch.
  };

  return (
    <Box component='form' onSubmit={handleSubmit} >

            <TextField
                type="file"
                onChange={handleFileChange}  
                margin="normal"
                variant="outlined"
                style={{backgroundColor: 'GrayText', borderRadius: '5px'}}
                               
            />    
            
            <br />
            <Button type="submit" variant="contained" >
                Submit
            </Button>
         
    </Box>
  );
}

export default FileUpload;
