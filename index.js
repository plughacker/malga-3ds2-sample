import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const merchantId = process.env.MERCHANT_ID;
const apiKey = process.env.API_KEY;
const clientId = process.env.CLIENT_ID;
const baseUrl = 'https://api.dev.malga.io';

const headers = {
  'x-api-key': apiKey,
  'x-client-id': clientId,
  'accept': 'application/json', 
  'content-type': 'application/json'
};

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// POST /v1/charges
// Iniciar um pagamento
app.post('/v1/charges', async (req, res) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/v1/charges`,
      headers: headers,
      data: {
        merchantId: merchantId,
        ...req.body
      }
    })
    
    res.send(response.data);
  } catch (e) {
    res.send(e.response.data);
  }
})

// Get /v1/charges/:id
// Obter uma charge pelo ID
app.get('/v1/charges', async (req, res) => {
  const transactionId = req.query.transaction;

  try {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/v1/charges/${transactionId}`,
      headers: headers,
    })
    
    res.send(response.data);
  } catch (e) {
    res.send(e);
  }
});


// Emular o backend do cliente
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
