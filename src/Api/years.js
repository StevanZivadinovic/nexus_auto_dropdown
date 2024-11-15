import axios from 'axios';

const token = '5cbe12fb62f4941267d623499a2a4fd5948fd3ef';
const apiBaseUrl = 'https://rateengine.ship.cars/v2/vehicles';

export default async (req, res) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/years/?token=${token}`);
    res.status(200).json({ years: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch years' });
  }
};
