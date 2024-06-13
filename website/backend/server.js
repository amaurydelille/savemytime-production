const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');
const transactionRouter = require('./routes/transactions.routes');
const cors = require('cors');
const { port } = require("./utils/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', tokenRouter);
app.use('/', transactionRouter);

app.get('/', (req, res) => {
    res.send('Server');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
