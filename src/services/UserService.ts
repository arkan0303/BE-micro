import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class UserService {
  userRepository = AppDataSource.getRepository(User);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = this.userRepository.create(req.body);
      await this.userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userRepository.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { fullName, alamat, jenisKelamin, status, email, password } =
        req.body;

      if (
        !fullName ||
        !alamat ||
        !jenisKelamin ||
        !status ||
        !email ||
        !password
      ) {
        return res.status(400).json({ error: "Please provide all fields" });
      }

      const userTuUpdate = await this.userRepository.findOne({
        where: { id: Number(id) },
      });

      if (!userTuUpdate) {
        return res.status(404).json({ error: "User not found" });
      }

      userTuUpdate.fullName = fullName;
      userTuUpdate.alamat = alamat;
      userTuUpdate.jenisKelamin = jenisKelamin;
      userTuUpdate.status = status;
      userTuUpdate.email = email;
      userTuUpdate.password = password;

      await this.userRepository.save(userTuUpdate);

      return res.status(200).json(userTuUpdate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (Number.isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const userToDelete = await this.userRepository.findOne({
        where: { id: Number(id) },
      });
      if (!userToDelete) {
        return res.status(404).json({ error: "User not found" });
      }
      await this.userRepository.remove(userToDelete);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
})();
