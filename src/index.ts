import { AppDataSource } from "./data-source";
import * as express from "express";
import Routes from "./routes";
import * as cors from "cors";
import * as path from "path";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
    app.use("/api/v1", Routes);

    app.listen(port, () => console.log("Listening on port " + port));
  })

  .catch((error) => console.log(error));
