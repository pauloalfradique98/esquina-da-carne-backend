// Importa pacotes essenciais
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Carrega variáveis do arquivo .env

// Cria o servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configura middlewares
app.use(cors()); // Permite chamadas de frontend externo
app.use(bodyParser.json()); // Permite receber JSON no body da requisição

// Rota de teste
app.get('/', (req, res) => {
    res.send('Backend Esquina da Carne funcionando!');
});

// Importa rota de leads
const leadsRoute = require('./routes/leads');
app.use('/leads', leadsRoute); // Tudo que vier em /leads será tratado em leads.js

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
