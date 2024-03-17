import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
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

  @ManyToMany(() => Partai, (partai) => partai.paslon, { cascade: true })
  @JoinTable()
  partai: Partai[];

  @OneToMany(() => Vote, (vote) => vote.paslon)
  votes: Vote[];
}
