import { Request, Response } from "express";
import { Partai } from "../entity/Partai";
import { Candidate } from "../entity/Candidate";
import { AppDataSource } from "../data-source";

export default class PartaiService {
  private partaiRepository = AppDataSource.getRepository(Partai);
  private candidateRepository = AppDataSource.getRepository(Candidate);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { namaPartai, ketuaUmum, visiMisi, alamat } = req.body;

      // Pastikan data yang diperlukan tersedia
      if (
        !namaPartai ||
        !ketuaUmum ||
        !alamat ||
        !visiMisi ||
        !Array.isArray(visiMisi)
      ) {
        return res.status(400).json({ error: "Please provide valid data" });
      }

      // Buat partai baru
      const newPartai = this.partaiRepository.create(req.body);

      // Simpan Partai ke dalam basis data
      await this.partaiRepository.save(newPartai);

      return res.status(201).json(newPartai);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const partais = await this.partaiRepository.find({
        relations: ["paslon"], // Perubahan disini
      });
      return res.status(200).json(partais);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const partaiToUpdate = await this.partaiRepository.findOne({
        where: { id: Number(id) },
        relations: ["paslon"], // Perubahan disini
      });
      if (!partaiToUpdate) {
        return res.status(404).json({ error: "Partai not found" });
      }
      this.partaiRepository.merge(partaiToUpdate, req.body);
      const updatedPartai = await this.partaiRepository.save(partaiToUpdate);
      return res.status(200).json(updatedPartai);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const partaiToDelete = await this.partaiRepository.findOne({
        where: { id: Number(id) },
        relations: ["paslon"], // Perubahan disini
      });
      if (!partaiToDelete) {
        return res.status(404).json({ error: "Partai not found" });
      }
      await this.partaiRepository.remove(partaiToDelete);
      return res.status(200).json({ message: "Partai deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const partai = await this.partaiRepository.findOne({
        where: { id: Number(id) },
        relations: ["paslon"],
      });
      if (!partai) {
        return res.status(404).json({ error: "Partai not found" });
      }
      return res.status(200).json(partai);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
