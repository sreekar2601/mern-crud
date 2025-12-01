import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongooose Connected");

    app.listen(port, () => {
      console.log("Server Started...", port);
    });
  })
  .catch(console.error);
