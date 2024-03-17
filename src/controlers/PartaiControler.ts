import { Request, Response } from "express";
import PartaiService from "../services/PartaiService";

const partaiService = new PartaiService();

export default new (class PartaiControler {
  createPartai = async (req: Request, res: Response): Promise<Response> => {
    return partaiService.create(req, res);
  };
  getAllPartais = async (req: Request, res: Response): Promise<Response> => {
    return partaiService.findAll(req, res);
  };

  updatePartai = async (req: Request, res: Response): Promise<Response> => {
    return partaiService.update(req, res);
  };

  deletePartai = async (req: Request, res: Response): Promise<Response> => {
    return partaiService.delete(req, res);
  };

  getPartaiById = async (req: Request, res: Response): Promise<Response> => {
    return partaiService.findById(req, res);
  };
})();
