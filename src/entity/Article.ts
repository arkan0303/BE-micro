// Article.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  picture: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @Column()
  username: string;
}
