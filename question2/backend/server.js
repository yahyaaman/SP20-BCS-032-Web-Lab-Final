import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//app config
const app = express();
const port = 5000;

//middlwares
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

//db config
const connection_url =
  "mongodb+srv://yahya:johncena3534@cluster0.hqhvdxp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => console.log("connected!!!"))
  .catch((err) => console.log(err));

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
