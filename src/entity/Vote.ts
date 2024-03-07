import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Candidate } from "./Candidate";
import { User } from "./User";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.votes)
  user: User;

  // Relasi dengan tabel Candidate (many-to-one)
  @ManyToOne((type) => Candidate, (paslon) => paslon.votes)
  paslon: Candidate;
}
