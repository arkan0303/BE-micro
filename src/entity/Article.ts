import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column("date")
  date: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  picture: string;

  @ManyToOne(() => User, (user) => user.article)
  user: User;
}
