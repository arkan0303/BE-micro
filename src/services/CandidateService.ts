import { Request, Response } from "express";
import { Candidate } from "../entity/Candidate";
import { Partai } from "../entity/Partai";
import { AppDataSource } from "../data-source";

export default class CandidateService {
  private candidateRepository = AppDataSource.getRepository(Candidate);
  private partaiRepository = AppDataSource.getRepository(Partai);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nama_paslon, nomor_urut, visi_misi, partaiIds } = req.body;

      // Validasi data yang diterima
      if (
        !nama_paslon ||
        !nomor_urut ||
        !Array.isArray(visi_misi) ||
        visi_misi.length === 0 ||
        !Array.isArray(partaiIds) ||
        partaiIds.length === 0
      ) {
        return res.status(400).json({ error: "Please provide valid data" });
      }

      // Pastikan semua partai yang dipilih ada dalam basis data
      const partais = await this.partaiRepository.findByIds(partaiIds);
      if (partais.length !== partaiIds.length) {
        return res.status(400).json({ error: "Invalid partai IDs provided" });
      }

      // Buat Paslon baru
      const newCandidate = this.candidateRepository.create({
        namaPaslon: nama_paslon,
        nomorUrut: nomor_urut,
        visiMisi: visi_misi,
        partai: partais, // Hubungkan Paslon dengan Partai yang dipilih
      });

      // Simpan Paslon ke dalam basis data
      const savedCandidate = await this.candidateRepository.save(newCandidate);

      return res.status(201).json(savedCandidate);
    } catch (error) {
      console.error("Error creating candidate:", error);
      return res.status(500).json({ error: "Failed to create candidate" });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const candidates = await this.candidateRepository.find({
        relations: ["partai"],
      });
      return res.status(200).json(candidates);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const candidateToUpdate = await this.candidateRepository.findOne({
        where: { id: Number(id) },
        relations: ["partai"],
      });
      if (!candidateToUpdate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      this.candidateRepository.merge(candidateToUpdate, req.body);
      const updatedCandidate = await this.candidateRepository.save(
        candidateToUpdate
      );
      return res.status(200).json(updatedCandidate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const candidateToDelete = await this.candidateRepository.findOne({
        where: { id: Number(id) },
        relations: ["partai"],
      });
      if (!candidateToDelete) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      await this.candidateRepository.remove(candidateToDelete);
      return res
        .status(200)
        .json({ message: "Candidate deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const candidate = await this.candidateRepository.findOne({
        where: { id: Number(id) },
        relations: ["partai"],
      });
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      return res.status(200).json(candidate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
