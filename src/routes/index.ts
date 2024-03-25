import * as express from "express";
import UserControler from "../controlers/UserControler";
import CandidateControler from "../controlers/CandidateControler";
import PartaiControler from "../controlers/PartaiControler";
import VoteControler from "../controlers/VoteControler";

const Routes = express.Router();
import upload from "../midleware/multer";
import ArticleControler from "../controlers/ArticleControler";

const articleControler = new ArticleControler();

// Routes for users
Routes.post("/create-user", UserControler.create);
Routes.get("/users", UserControler.find);
Routes.put("/update-user/:id", UserControler.update);
Routes.delete("/delete-user/:id", UserControler.delete);

// Routes for candidates (Paslon)
Routes.post(
  "/candidates",
  upload.single("picture"),
  CandidateControler.createCandidate
);
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

// Routes for votes
Routes.post("/vote", VoteControler.castVote);
Routes.get("/votes", VoteControler.getVotes);

// Routes for article
Routes.post(
  "/articles",
  upload.single("picture"),
  articleControler.createArticle
);
Routes.get("/articles", articleControler.getAllArticles);
Routes.get("/articles/:id", articleControler.getArticleById);
Routes.put("/articles/:id", articleControler.updateArticle);
Routes.delete("/articles/:id", articleControler.deleteArticle);

export default Routes;
