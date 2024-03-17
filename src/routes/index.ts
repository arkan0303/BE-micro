import * as express from "express";
import UserControler from "../controlers/UserControler";
import CandidateControler from "../controlers/CandidateControler";
import PartaiControler from "../controlers/PartaiControler";

const Routes = express.Router();

// Routes for users
Routes.post("/create-user", UserControler.create);
Routes.get("/users", UserControler.find);
Routes.put("/update-user/:id", UserControler.update);
Routes.delete("/delete-user/:id", UserControler.delete);

// Routes for candidates (Paslon)
Routes.post("/candidates", CandidateControler.createCandidate);
Routes.get("/candidates", CandidateControler.getAllCandidates);
Routes.get("/candidates/:id", CandidateControler.getCandidateById);
Routes.put("/candidates/:id", CandidateControler.updateCandidate);
Routes.delete("/candidates/:id", CandidateControler.deleteCandidate);

// Routes for parties (Partai)
Routes.post("/partais", PartaiControler.createPartai);
Routes.get("/partais", PartaiControler.getAllPartais);
Routes.get("/partais/:id", PartaiControler.getPartaiById);
Routes.put("/partais/:id", PartaiControler.updatePartai);
Routes.delete("/partais/:id", PartaiControler.deletePartai);

export default Routes;
