// -- БИБЛИОТЕКИ --
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// -- /БИБЛИОТЕКИ --

// -- РОУТИНГ --
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
// -- /РОУТИНГ --

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoDb has been started");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}...`);
});
