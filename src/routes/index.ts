import * as express from "express";
import UserControler from "../controlers/UserControler";
import CandidateControler from "../controlers/CandidateControler";

const Routes = express.Router();

// routes users
Routes.post("/create-user", UserControler.create);
Routes.get("/get-user", UserControler.find);
Routes.put("/update-user/:id", UserControler.update);
Routes.delete("/delete-user/:id", UserControler.delete);

// routes candidate
Routes.post("/create-candidate", CandidateControler.create);
Routes.get("/get-candidate", CandidateControler.find);
Routes.put("/update-candidate/:id", CandidateControler.update);
Routes.delete("/delete-candidate/:id", CandidateControler.delete);

export default Routes;
