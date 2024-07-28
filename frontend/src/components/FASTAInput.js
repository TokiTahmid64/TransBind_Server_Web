import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, CardHeader } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FASTAInput = ({ onSubmit,reset }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target.result);
      reader.readAsText(file);
      setFile(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(text);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
      <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
        <CardHeader
          title="Instructions"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            textAlign: 'center',
            padding: 1,
          }}
        />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Please provide your RNA sequence in FASTA format. You can either paste the sequence directly into the input box below. Ensure that the sequence is properly formatted and includes the necessary headers. This tool will process the input and predict RNA binding protein sites. The output will also be in FASTA format, showing the modified or annotated sequence based on the predictions.
          </Typography>

          <br/>
          <Typography variant='body1' gutterBottom>
            To download the processed FASTA output file, please enter your job ID in the input box below. After entering the job ID, click the "Fetch Output" button to retrieve your results. Once the output is displayed, you can download the FASTA file by clicking the "Download Output" button.
          </Typography>
        </CardContent>
      </Card>
      <TextField
        label="FASTA Input"
        multiline
        rows={10}
        value={text}
        onChange={(e) => {
          reset()
          setText(e.target.value)
        }}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{ mr: 2 }}
      >
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button> */}
      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      &nbsp; &nbsp; &nbsp;
    </Box>
  );
};

export default FASTAInput;
