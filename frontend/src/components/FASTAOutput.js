import React, { useState } from 'react';
import { TextField, Box, Button, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const FASTAOutput = ({ fetchOutput }) => {
  const [jobId, setJobId] = useState('');
  const [output, setOutput] = useState('');
  const [seq, setSeq] = useState('');

  const handleFetchOutput = async () => {
    setOutput(null)
    const result = await fetchOutput(jobId);
    setOutput(result?.output ?? '');
    setSeq(result?.seq ?? '');
  };

  const handleDownload = () => {
    const textFile = seq + '\n' + output
    const blob = new Blob([textFile], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <TextField
        label="Job ID"
        value={jobId}
        onChange={(e) => {
          setJobId('')
          setOutput(null)
          setJobId(e.target.value)
        }}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Stack direction='row' spacing={3}>
        <Button
          variant="contained"
          color="success"
          onClick={handleFetchOutput}
          sx={{ mt: 2 }}
          disabled={jobId?.length !== 24}
        >
          Fetch Output
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={()=>{
            setJobId('')
            setOutput(null)
          }}
          sx={{ mt: 2 }}
        >
          Clear
        </Button>
      </Stack>
      {output && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Input Sequence"
            multiline
            rows={3}
            value={seq}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="FASTA Output"
            multiline
            rows={3}
            value={output}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="info"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ mt: 2 }}
          >
            Download Output
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FASTAOutput;
