const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter.js');
const accountRouter = require('./routes/accountRouter.js');
const cardRouter = require('./routes/cardRouter.js');
const authRouter = require('./routes/authRouter.js');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use((_, _1, next) => {
  console.log(new Date());
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/cards', cardRouter);

app.all('*', () => {
  console.log('no route found');
  res.status(404);
});

module.exports = app;
