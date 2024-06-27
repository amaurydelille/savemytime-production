const express = require('express');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');
const transactionRouter = require('./routes/transactions.routes');
const cors = require('cors');
const { port } = require("./utils/config");
const rateLimit = require('express-rate-limit')

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
app.options('*', cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/', tokenRouter);
app.use('/', transactionRouter);

// Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50
});
app.use('/auth/', limiter);
app.use('/auth/signup', limiter);

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

module.exports = app; 
