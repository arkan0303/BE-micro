import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Partai } from "./Partai";
import { Vote } from "./Vote";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nama_paslon" })
  namaPaslon: string;

  @Column({ name: "nomor_urut" })
  nomorUrut: number;

  @Column({ type: "json", nullable: true })
  visiMisi: string[];

  @OneToMany((type) => Partai, (partai) => partai.paslon)
  parties: Candidate[];

  // Relasi dengan tabel Vote (one-to-many)
  @OneToMany((type) => Vote, (vote) => vote.paslon)
  votes: Vote[];
}
