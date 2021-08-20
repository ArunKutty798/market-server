import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL =
  "mongodb+srv://market:market@123@cluster0.fifaq.mongodb.net/market?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server Running on Port: http://localhost:${PORT},mongodb connected`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
