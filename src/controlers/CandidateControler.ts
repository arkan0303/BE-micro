import { Request, Response } from "express";
import CandidateService from "../services/CandidateService";

export default new (class CandidateControler {
  async create(req: Request, res: Response) {
    await CandidateService.create(req, res);
  }

  async find(req: Request, res: Response) {
    await CandidateService.find(req, res);
  }

  async update(req: Request, res: Response) {
    await CandidateService.update(req, res);
  }

  async delete(req: Request, res: Response) {
    await CandidateService.delete(req, res);
  }
})();
