import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new (class UserControler {
  async create(req: Request, res: Response) {
    await UserService.create(req, res);
  }
  async find(req: Request, res: Response) {
    await UserService.find(req, res);
  }
  async update(req: Request, res: Response) {
    await UserService.update(req, res);
  }
  async delete(req: Request, res: Response) {
    await UserService.delete(req, res);
  }
})();
