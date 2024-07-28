const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const sequence = require('./models/sequence');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

// Route to handle FASTA input
app.get('/',(req,res)=>{
  res.send("Hello...")
})

app.post('/api/process-fasta', async (req, res) => {
  try {
    const { seq } = req.body;
    console.log(req.body,seq)
    
    const newSequence = new sequence({
      seq: seq,
    });

    await newSequence.save();

    res.status(200).json({ message: 'FASTA data saved successfully', jobId: newSequence._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get("/api/fetch-output/:id", async (req, res) => {
    console.log("here")
    
    let jobId = req.params.id;
    try{
      const output = await sequence.findById(jobId);
      console.log(output)
      if (!output) res.json({output:"Job ID Not found"}).status(404);
      else res.json(output).status(200);
    } catch (err) {
      console.error(err.message);
      res.json({output:err.message}).status(500);
    }
  });

app.listen(PORT,()=>{
  console.log(`server started at ${PORT}....`)
})