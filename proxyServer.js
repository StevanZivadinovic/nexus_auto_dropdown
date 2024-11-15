// https://rateengine.ship.cars/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef
// https://rateengine.ship.cars/v2/vehicles/makes/?year={year}&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef

import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const token = '5cbe12fb62f4941267d623499a2a4fd5948fd3ef';
const apiBaseUrl = 'https://rateengine.ship.cars/v2/vehicles';

app.use(cors({
  origin: ['https://nexus-auto-dropdown-yay3.vercel.app'], 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Accept'], 
}));

// API endpoints
app.get('/api/years', async (req, res) => {
  console.log(req?.baseUrl)
  try {
    const response = await axios.get(`${apiBaseUrl}/years/?token=${token}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
   
    res.json({ years: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch years' });
  }
});

app.get('/api/makes', async (req, res) => {
  const { year } = req.query;
  if (!year) {
    return res.status(400).json({ error: 'Year is required' });
  }

  try {
    const response = await axios.get(`${apiBaseUrl}/makes/?year=${year}&token=${token}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    res.json({ makes: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch makes' });
  }
});

app.get('/api/models', async (req, res) => {
  const { year, make } = req.query;
  if (!year || !make) {
    return res.status(400).json({ error: 'Year and make are required' });
  }

  try {
    const response = await axios.get(`${apiBaseUrl}/models/?year=${year}&make=${make}&token=${token}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    res.json({ models: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch models' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

