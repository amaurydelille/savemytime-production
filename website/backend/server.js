const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');
const transactionRouter = require('./routes/transactions.routes');
const cors = require('cors');
const { port, authEndpoint } = require("./utils/config");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', tokenRouter);
app.use('/', transactionRouter)

app.listen(port, () => {
    console.log('Server listening!');
})