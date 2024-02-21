import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Lavista } from "./Lavista";
import { Item } from "./Item";

@Entity({ name: "item_type" })
export class ItemType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  // Relations
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
  @ManyToOne(() => Lavista, (lavista) => lavista.item_types, { onDelete: "CASCADE" })
  lavista: Lavista;

  @OneToMany(() => Item, (item) => item.item_type, { onDelete: "CASCADE" })
  items: Item[];
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
