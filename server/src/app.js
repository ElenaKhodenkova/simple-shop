require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const express = require('express');

const cors = require('cors');
const removeHeaders = require('../middlewares/removeHeaders');

const corsConfig = {
  origin: [ 
    'http://localhost:5173',
    'http://127.0.0.1.5173'
  ],
  credentials: true
}

const app = express();
const { PORT } = process.env;

app.use(removeHeaders)
app.use(cors(corsConfig))

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
