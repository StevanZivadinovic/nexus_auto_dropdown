import axios from 'axios';

const token = '5cbe12fb62f4941267d623499a2a4fd5948fd3ef';
const apiBaseUrl = 'https://rateengine.ship.cars/v2/vehicles';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json({ models: response.data });
  } catch (error) {
    console.error('Error fetching models:', error.message);
    res.status(500).json({ error: 'Unable to fetch models' });
  }
};
