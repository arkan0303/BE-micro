import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";

export default new (class CandidateService {
  userRepository = AppDataSource.getRepository(Candidate);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newCandidate = this.userRepository.create(req.body);
      await this.userRepository.save(newCandidate);
      return res.status(201).json(newCandidate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const candidates = await this.userRepository.find();
      return res.status(200).json(candidates);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { namaPaslon, nomorUrut, visiMisi } = req.body;

      if (!namaPaslon || !nomorUrut || !visiMisi) {
        return res.status(400).json({ error: "Please provide all fields" });
      }
      const candidateToUpdate = await this.userRepository.findOne({
        where: { id: Number(id) },
      });
      if (!candidateToUpdate) {
        return res.status(404).json({ error: "Candidate not found" });
      }

      candidateToUpdate.namaPaslon = namaPaslon;
      candidateToUpdate.nomorUrut = nomorUrut;
      candidateToUpdate.visiMisi = visiMisi;

      await this.userRepository.save(candidateToUpdate);
      return res.status(200).json(candidateToUpdate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params

      if(Number.isNaN(Number(id))){
        return res.status(400).json({ error: "Please provide a valid id" });
      }
      const candidateToDelete = await this.userRepository.findOne({
        where: { id: Number(id) },
      })

      if(!candidateToDelete){
        return res.status(404).json({ error: "Candidate not found" });
      }
      await this.userRepository.remove(candidateToDelete);
      return res.status(200).json({ message: "Candidate deleted successfully" });
    }catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
})();
