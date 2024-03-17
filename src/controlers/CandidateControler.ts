import { Request, Response } from "express";
import CandidateService from "../services/CandidateService";

const candidateService = new CandidateService();

export default new (class CandidateControler {
  createCandidate = async (req: Request, res: Response): Promise<Response> => {
    return candidateService.create(req, res);
  };

  getAllCandidates = async (req: Request, res: Response): Promise<Response> => {
    return candidateService.findAll(req, res);
  };

  updateCandidate = async (req: Request, res: Response): Promise<Response> => {
    return candidateService.update(req, res);
  };

  deleteCandidate = async (req: Request, res: Response): Promise<Response> => {
    return candidateService.delete(req, res);
  };

  getCandidateById = async (req: Request, res: Response): Promise<Response> => {
    return candidateService.findById(req, res);
  };
})();
