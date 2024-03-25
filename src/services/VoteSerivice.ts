import { Vote } from "../entity/Vote";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Candidate } from "../entity/Candidate";

export default new (class VoteService {
  voteRepository = AppDataSource.getRepository(Vote);

  async castVote(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, candidateId } = req.body;

      // Validasi userId dan candidateId
      if (!Number.isInteger(userId) || !Number.isInteger(candidateId)) {
        return res
          .status(400)
          .json({ error: "Invalid user ID or candidate ID" });
      }

      // Mencari user yang akan melakukan vote
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Mencari kandidat yang dipilih
      const candidateRepository = AppDataSource.getRepository(Candidate);
      const candidate = await candidateRepository.findOne({
        where: { id: candidateId },
      });
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }

      // Menyimpan vote ke dalam database
      const newVote = this.voteRepository.create({ user, paslon: candidate });
      await this.voteRepository.save(newVote);

      // Ambil data lengkap user dan candidate
      const voteWithRelations = await this.voteRepository.findOne({
        where: { id: newVote.id },
        relations: ["user", "paslon"],
      });

      return res
        .status(201)
        .json({ message: "Vote successfully casted", vote: voteWithRelations });
    } catch (error) {
      console.error("Failed to cast vote:", error);
      return res.status(500).json({ error: "Failed to cast vote" });
    }
  }

  async getVotes(req: Request, res: Response): Promise<Response> {
    try {
      const votes = await this.voteRepository.find({
        relations: ["user", "paslon"],
      });
      return res.status(200).json(votes);
    } catch (error) {
      console.error("Failed to fetch votes:", error);
      return res.status(500).json({ error: "Failed to fetch votes" });
    }
  }
})();
