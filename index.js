const cors = require('cors');
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', async (req, res) => {
  const venue = req.body.venue;
  const time = req.body.time;
  const cookie = req.body.cookie || '';
  if (!venue || !time) {
    return res.status(400).send('Missing venue or time');
  }
  const url = `https://members.myactivesg.com/facilities/view/activity/18/venue/${venue}?time_from=${time}`;
  const response = await fetch(url, {
    headers: {
      'Cookie': `ActiveSG=${cookie}`,
    },
  });
  const text = await response.text();
  res.send(text);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});