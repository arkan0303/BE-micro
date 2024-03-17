import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class Partai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nama_partai" })
  namaPartai: string;

  @Column({ name: "ketua_umum" })
  ketuaUmum: string;

  @Column({ type: "json", nullable: true })
  visiMisi: string[];

  @Column()
  alamat: string;

  @ManyToMany(() => Candidate, (candidates) => candidates.partai)
  paslon: Candidate[];
}
