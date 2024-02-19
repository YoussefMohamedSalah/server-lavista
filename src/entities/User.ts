import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Lavista } from "./Lavista";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: null,
  })
  name: string;

  @Column({
    default: null,
  })
  password: string;

  @Column({
    nullable: true,
  })
  temp_otp: number;

  @Column({
    nullable: true,
  })
  temp_password_code: string;

  @ManyToOne(() => Lavista, (lavista) => lavista.users, { onDelete: "CASCADE" })
  lavista: Lavista;
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
