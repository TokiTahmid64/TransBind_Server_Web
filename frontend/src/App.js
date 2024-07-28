import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import FASTAInput from './components/FASTAInput';
import FASTAOutput from './components/FASTAOutput';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import theme from './theme';
import iAxios from './iAxios';


function App() {
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState(null)
  
  const resetInput = () => {
    setMessage(null);
    
  }
  const handleFASTAInput = async (text, file) => {
    setLoading(true);
    setMessage(null);

    try{
      const response = await iAxios.post('/api/process-fasta', {
          seq: text
        });
  
      if(response?.status === 200){
        setMessage(response.data)
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
    // console.log("Job ID:", result.jobId);
  };

  const fetchOutput = async (jobId) => {
    try{
      const response = await iAxios.get(`/api/fetch-output/${jobId}`);
      if(response?.status === 200){
        const data = response?.data

        if(data?.output === ''){
          return {output:"Processing..."}
        }
        return data
      } 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Grid item>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                RNA Binding Protein Site
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ my: 2 }}>
            <FASTAInput onSubmit={handleFASTAInput} reset={resetInput} />
          </Box>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {
            message !== null && (
              <Typography variant="h5" gutterBottom>
                {message?.message}
                <br/>
                <br/>
                JobId: {message?.jobId}
              </Typography>
            )
          }
          <Box sx={{ my: 2 }}>
            <FASTAOutput fetchOutput={fetchOutput} />
          </Box>
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
