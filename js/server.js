const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sometimes'
});

// Conectar ao banco de dados
connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('private')); 


app.post('/registrar', (req, res) => {
    const { nome, email, password, cpf } = req.body;

    const sql = 'INSERT INTO usuarios (nome, email, password, cpf) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nome, email, password, cpf], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Registrado com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
