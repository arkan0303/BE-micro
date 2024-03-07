import { AppDataSource } from "./data-source";
import * as express from "express";
import Routes from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/v1", Routes);

    app.listen(port, () => console.log("Listening on port " + port));
  })

  .catch((error) => console.log(error));
