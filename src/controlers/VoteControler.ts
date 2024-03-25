import { Request, Response } from "express";
import VoteSerivice from "../services/VoteSerivice";

const voteController = {
  castVote: async (req: Request, res: Response) => {
    try {
      await VoteSerivice.castVote(req, res);
    } catch (error) {
      console.error("Failed to cast vote:", error);
      return res.status(500).json({ error: "Failed to cast vote" });
    }
  },

  getVotes: async (req: Request, res: Response) => {
    try {
      await VoteSerivice.getVotes(req, res);
    } catch (error) {
      console.error("Failed to fetch votes:", error);
      return res.status(500).json({ error: "Failed to fetch votes" });
    }
  },
};

export default voteController;
