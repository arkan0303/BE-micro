import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class Partai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_partai: string;

  @Column()
  ketua_umum: string;

  @Column({ type: "json", nullable: true })
  visi_misi: string[];

  @Column()
  alamat: string;

  @ManyToOne((type) => Candidate, (paslon) => paslon.parties)
  paslon: Candidate;
}
