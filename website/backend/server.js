const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');
const transactionRouter = require('./routes/transactions.routes');
const cors = require('cors');
const { port } = require("./utils/config");

const app = express(); // Assurez-vous que cette ligne est présente

const allowedOrigins = [
    'https://savemytime-production-client.vercel.app', 
    'https://extension-savemytime-production.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', tokenRouter);
app.use('/', transactionRouter);

app.get('/', (req, res) => {
    res.send('Server');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app; // Assurez-vous d'exporter app correctement
