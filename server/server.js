const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require('./router/auth-route');
const userRouter = require('./router/use-route');
const connectDB = require('./services/connect-db.service');

require('dotenv').config();

// middleware apply cors add all request
app.use(cors());

// middleware get info client by req.body
app.use(express.json());

// connect database
connectDB();

// middleware router
app.use('/api/auth/admin', userRouter);
app.use('/api/auth', authRouter);




app.listen(process.env.PORT, function () {
  console.log(`server is running...${process.env.PORT}`);
});