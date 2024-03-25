import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Candidate } from "./Candidate";
import { User } from "./User";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Candidate, (paslon) => paslon.votes)
  paslon: Candidate;
}
