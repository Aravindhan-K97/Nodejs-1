import express from 'express';
import fs from 'fs';
import { format } from 'date-fns';
import path from 'path';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  try {
    const today = format(new Date(), 'dd-MM-yyyy-HH-mm-ss');
    const filePath = path.join('Current_TimeStamp', `${today}.txt`);
    
    fs.writeFileSync(filePath, today, 'utf8');
    const data = fs.readFileSync(filePath, 'utf8');
    
    res
      .status(200)
      .send(
        `<h1 style="text-align: center; color: blue;background-color: black;">Current TimeStamp: ${today}</h1><h3 style="text-align: center; color: red">This Timestamp data has been successfully saved to <mark>Current_TimeStamp</mark> folder, Change the endpoint to <mark>/getTextFiles</mark> to view all the Timestamps.</h3>`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// New endpoint to retrieve all text files in a folder

app.get('/getTextFiles', (req, res) => {
  const folderPath = 'Current_TimeStamp';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while listing the files from the directory');
    } else {
      const textFiles = files.filter((file) => path.extname(file) === '.txt');
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
